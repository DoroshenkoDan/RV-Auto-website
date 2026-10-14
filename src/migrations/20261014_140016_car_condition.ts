import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_cars\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`vin\` text,
  	\`title\` text NOT NULL,
  	\`status\` text NOT NULL,
  	\`condition\` text NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`photo_folder_id\` integer,
  	\`year\` numeric NOT NULL,
  	\`mileage_km\` numeric NOT NULL,
  	\`engine\` text NOT NULL,
  	\`drivetrain\` text NOT NULL,
  	\`transmission\` text NOT NULL,
  	\`current_bid\` numeric,
  	\`price\` numeric NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_cars\`("id", "slug", "vin", "title", "status", "condition", "featured", "photo_folder_id", "year", "mileage_km", "engine", "drivetrain", "transmission", "current_bid", "price", "updated_at", "created_at") SELECT "id", "slug", "vin", "title", "status", 'noDamage', "featured", "photo_folder_id", "year", "mileage_km", "engine", "drivetrain", "transmission", "current_bid", "price", "updated_at", "created_at" FROM \`cars\`;`)
  await db.run(sql`DROP TABLE \`cars\`;`)
  await db.run(sql`ALTER TABLE \`__new_cars\` RENAME TO \`cars\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`cars_slug_idx\` ON \`cars\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`cars_photo_folder_idx\` ON \`cars\` (\`photo_folder_id\`);`)
  await db.run(sql`CREATE INDEX \`cars_updated_at_idx\` ON \`cars\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cars_created_at_idx\` ON \`cars\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`cars_locales\` DROP COLUMN \`damage_tag\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cars_locales\` ADD \`damage_tag\` text;`)
  await db.run(sql`ALTER TABLE \`cars\` DROP COLUMN \`condition\`;`)
}
