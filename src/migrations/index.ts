import * as migration_20260820_154406_initial from "./20260820_154406_initial";
import * as migration_20260820_154550_add_team from "./20260820_154550_add_team";
import * as migration_20260901_132428_add_reviews from "./20260901_132428_add_reviews";

export const migrations = [
  {
    up: migration_20260820_154406_initial.up,
    down: migration_20260820_154406_initial.down,
    name: "20260820_154406_initial",
  },
  {
    up: migration_20260820_154550_add_team.up,
    down: migration_20260820_154550_add_team.down,
    name: "20260820_154550_add_team",
  },
  {
    up: migration_20260901_132428_add_reviews.up,
    down: migration_20260901_132428_add_reviews.down,
    name: "20260901_132428_add_reviews",
  },
];
