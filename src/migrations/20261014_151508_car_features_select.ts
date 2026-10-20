import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`cars_features_locales\`;`)
  await db.run(sql`DROP TABLE \`cars_features\`;`)
  await db.run(sql`CREATE TABLE \`cars_features\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cars_features_order_idx\` ON \`cars_features\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`cars_features_parent_idx\` ON \`cars_features\` (\`parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`cars_features\`;`)
  await db.run(sql`CREATE TABLE \`cars_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cars_features_order_idx\` ON \`cars_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cars_features_parent_id_idx\` ON \`cars_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cars_features_locales\` (
  	\`value\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cars_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cars_features_locales_locale_parent_id_unique\` ON \`cars_features_locales\` (\`_locale\`,\`_parent_id\`);`)
}
