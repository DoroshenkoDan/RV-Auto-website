import path from "path";
import { fileURLToPath } from "url";

import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { uk } from "@payloadcms/translations/languages/uk";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Cars } from "@/collections/Cars";
import { CarMedia, ReviewMedia, TeamMedia } from "@/collections/media";
import { Reviews } from "@/collections/Reviews";
import { Team } from "@/collections/Team";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, CarMedia, TeamMedia, ReviewMedia, Cars, Team, Reviews],
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "" },
    busyTimeout: 5000,
    wal: true,
  }),
  sharp,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  localization: {
    locales: ["uk", "en"],
    defaultLocale: "uk",
    fallback: true,
  },
  i18n: {
    supportedLanguages: { uk, en },
    fallbackLanguage: "uk",
  },
});
