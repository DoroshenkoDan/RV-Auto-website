export const PER_IP = { limit: 10, windowMs: 10 * 60 * 1000 };

export const GLOBAL = { limit: 100, windowMs: 60 * 60 * 1000 };

const SWEEP_EVERY = 500;

const hitsByIp = new Map<string, number[]>();

let globalHits: number[] = [];

let callsSinceSweep = 0;

function withinWindow(timestamps: number[], now: number, windowMs: number) {
  return timestamps.filter((timestamp) => now - timestamp < windowMs);
}

function sweep(now: number) {
  for (const [ip, timestamps] of hitsByIp) {
    const fresh = withinWindow(timestamps, now, PER_IP.windowMs);

    if (fresh.length === 0) {
      hitsByIp.delete(ip);
    } else {
      hitsByIp.set(ip, fresh);
    }
  }
}

export function resetRateLimit() {
  hitsByIp.clear();
  globalHits = [];
  callsSinceSweep = 0;
}

export function checkRateLimit({
  ip,
  now,
}: {
  ip: string | null;
  now: number;
}) {
  const ipHits =
    ip === null
      ? []
      : withinWindow(hitsByIp.get(ip) ?? [], now, PER_IP.windowMs);

  const global = withinWindow(globalHits, now, GLOBAL.windowMs);

  return {
    allowed: ipHits.length < PER_IP.limit && global.length < GLOBAL.limit,
  };
}

export function recordLead({ ip, now }: { ip: string | null; now: number }) {
  callsSinceSweep += 1;

  if (callsSinceSweep >= SWEEP_EVERY) {
    callsSinceSweep = 0;
    sweep(now);
  }

  if (ip !== null) {
    const ipHits = withinWindow(hitsByIp.get(ip) ?? [], now, PER_IP.windowMs);

    ipHits.push(now);
    hitsByIp.set(ip, ipHits);
  }

  globalHits = withinWindow(globalHits, now, GLOBAL.windowMs);
  globalHits.push(now);
}
