import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const PLATFORMS = { copart: "1", iaai: "2", manheim: "6" };

const FEE_PLATFORMS = ["copart", "iaai"];

const VEHICLES = { car: "sedan", pickup: "pickup", motorcycle: "moto" };

const EXTRA_FEE = { copart: 55, iaai: 0 };

const CITY_NAME_FIXES = {
  "Cus\\set\\a": null,
  "V\\into\\n": null,
  Menton: null,
  "Kansas City Eastast": null,
  "Milwauke South": null,
  "St cloud": null,
  Vinthon: "Vinton",
  "St.Louis": "St. Louis",
  "Kansas City EasT": "Kansas City East",
  "Crashedtoys Minneapolis": "CrashedToys Minneapolis",
  "So Sacramento": "South Sacramento",
  "Las Vegas WEST": "Las Vegas West",
  "PHOENIX NORTH": "Phoenix North",
  "CEDAR RAPIDS": "Cedar Rapids",
  "HARTFORD CITY": "Hartford City",
  AKRON: "Akron",
  CLEWISTON: "Clewiston",
  CUSSETA: "Cusseta",
  FAIRBURN: "Fairburn",
  LAUREL: "Laurel",
  NAPA: "Napa",
  ROANOKE: "Roanoke",
  RUTLAND: "Rutland",
  SPANAWAY: "Spanaway",
  WAYLAND: "Wayland",
  WINDHAM: "Windham",
  "Manheim Riverside ( JURUPA)": "Manheim Riverside (Jurupa)",
  "Manheim Riverside (FREMONT)": "Manheim Riverside (Fremont)",
  "Manheim Riverside (INDUSTRIAL)": "Manheim Riverside (Industrial)",
};

function cleanCityName(name) {
  const fixed = name in CITY_NAME_FIXES ? CITY_NAME_FIXES[name] : name;

  return fixed?.replace(/-(North|South|East|West)$/, " $1") ?? null;
}

const OUTPUT_DIR = resolve("src/lib/calculator/data");

const source = process.argv[2];

if (!source) {
  console.error(
    "Usage: node scripts/import-caucasus.mjs <saved-calculator.html>",
  );
  process.exit(1);
}

const html = readFileSync(source, "utf8");

const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((body) => body.includes("const FEES"));

if (!script) {
  throw new Error("FEES constant not found, the page layout has changed");
}

function readConstant(name) {
  const match = new RegExp(`(?:const|var|let) ${name}\\s*=\\s*`).exec(script);

  if (!match) {
    throw new Error(`${name} constant not found`);
  }

  let depth = 0;
  let quote = null;
  let index = match.index + match[0].length;
  const start = index;

  for (; index < script.length; index++) {
    const char = script[index];

    if (quote) {
      if (char === "\\") index++;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") quote = char;
    else if (char === "{" || char === "[") depth++;
    else if (char === "}" || char === "]") depth--;
    else if (char === ";" && depth === 0) break;
  }

  return Function(`return (${script.slice(start, index)})`)();
}

function readOptions(selectName) {
  const start = html.indexOf(`name="${selectName}"`);
  const end = html.indexOf("</select>", start);

  return [...html.slice(start, end).matchAll(/<option([^>]*)>([^<]*)</g)]
    .map(([, attributes, text]) => ({
      attributes: Object.fromEntries(
        [...attributes.matchAll(/([\w-]+)="([^"]*)"/g)].map(
          ([, key, value]) => [key, value],
        ),
      ),
      text: text.trim(),
    }))
    .filter(({ attributes }) => attributes.value);
}

const logistics = readConstant("LOGISTIC_PRICES");
const fees = readConstant("FEES");

const states = new Map(
  readOptions("state").map(({ attributes, text }) => [
    attributes.value,
    {
      code: text,
      isCanada: attributes["data-is-canada"] === "1",
      special: {
        copart: attributes["data-special-copart-state"] === "1",
        iaai: attributes["data-special-iaai-state"] === "1",
      },
    },
  ]),
);

const cities = readOptions("city").map(({ attributes, text }) => ({
  id: attributes.value,
  name: text,
  state: states.get(attributes["data-state"]),
}));

function sortKeys(object) {
  return Object.fromEntries(
    Object.entries(object).sort(([a], [b]) => a.localeCompare(b)),
  );
}

const locations = {};

for (const [auction, platform] of Object.entries(PLATFORMS)) {
  const byState = {};

  for (const city of cities) {
    const name = cleanCityName(city.name);

    if (!city.state || city.state.isCanada || name === null) continue;

    const prices = {};
    let port = null;

    for (const [vehicle, caucasusType] of Object.entries(VEHICLES)) {
      const entry = logistics[caucasusType]?.[platform]?.[city.id];

      if (entry?.price) {
        prices[vehicle] = Number(entry.price);
        port ??= entry.port || null;
      }
    }

    if (prices.car === undefined) continue;

    byState[city.state.code] ??= {};

    if (byState[city.state.code][name]) {
      throw new Error(`${auction} ${city.state.code}: duplicate city ${name}`);
    }

    byState[city.state.code][name] = { port, ...prices };
  }

  locations[auction] = sortKeys(
    Object.fromEntries(
      Object.entries(byState).map(([state, stateCities]) => [
        state,
        sortKeys(stateCities),
      ]),
    ),
  );
}

function toTier(row) {
  const tier = {
    min: Number(row.min_price),
    max: row.max_price === null ? null : Number(row.max_price),
  };

  return row.is_percent
    ? { ...tier, percent: Number(row.value) }
    : { ...tier, fee: Number(row.value) };
}

function readTiers(rows, special) {
  return rows
    .filter((row) => !row.is_clean_title)
    .filter((row) => JSON.parse(row.state_ids).length > 0 === special)
    .map(toTier)
    .sort((a, b) => a.min - b.min);
}

const auctionFees = {};

for (const auction of FEE_PLATFORMS) {
  const table = fees[PLATFORMS[auction]].standard;
  const fixed = [table[3], table[4]]
    .map((rows) => Number(rows[0]?.value ?? 0))
    .reduce((sum, value) => sum + value, 0);

  auctionFees[auction] = {
    fixed,
    extra: EXTRA_FEE[auction],
    specialStates: [...states.values()]
      .filter((state) => state.special[auction])
      .map((state) => state.code)
      .sort(),
    standard: {
      bid: readTiers(table[1], false),
      online: readTiers(table[2], false),
    },
    special: {
      bid: readTiers(table[1], true),
      online: readTiers(table[2], true),
    },
  };
}

function write(file, data) {
  writeFileSync(
    resolve(OUTPUT_DIR, file),
    `${JSON.stringify(data, null, 2)}\n`,
  );
}

write("us-locations.json", locations);
write("us-auction-fees.json", auctionFees);

for (const auction of Object.keys(PLATFORMS)) {
  const stateCount = Object.keys(locations[auction]).length;
  const cityCount = Object.values(locations[auction]).reduce(
    (sum, stateCities) => sum + Object.keys(stateCities).length,
    0,
  );

  console.log(`${auction}: ${stateCount} states, ${cityCount} cities`);
}
