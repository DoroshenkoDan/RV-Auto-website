import * as migration_20260820_154406_initial from "./20260820_154406_initial";
import * as migration_20260820_154550_add_team from "./20260820_154550_add_team";
import * as migration_20260901_132428_add_reviews from "./20260901_132428_add_reviews";
import * as migration_20260907_175320_drop_legacy_media from "./20260907_175320_drop_legacy_media";
import * as migration_20260907_175332_add_media_collections from "./20260907_175332_add_media_collections";
import * as migration_20260907_190247_add_review_media_folders from "./20260907_190247_add_review_media_folders";

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
  {
    up: migration_20260907_175320_drop_legacy_media.up,
    down: migration_20260907_175320_drop_legacy_media.down,
    name: "20260907_175320_drop_legacy_media",
  },
  {
    up: migration_20260907_175332_add_media_collections.up,
    down: migration_20260907_175332_add_media_collections.down,
    name: "20260907_175332_add_media_collections",
  },
  {
    up: migration_20260907_190247_add_review_media_folders.up,
    down: migration_20260907_190247_add_review_media_folders.down,
    name: "20260907_190247_add_review_media_folders",
  },
];
