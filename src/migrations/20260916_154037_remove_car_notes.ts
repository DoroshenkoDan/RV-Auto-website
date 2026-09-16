import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cars_locales\` DROP COLUMN \`location_note\`;`)
  await db.run(sql`ALTER TABLE \`cars_locales\` DROP COLUMN \`eta_note\`;`)
  await db.run(sql`ALTER TABLE \`cars_locales\` DROP COLUMN \`auction_note\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cars_locales\` ADD \`location_note\` text;`)
  await db.run(sql`ALTER TABLE \`cars_locales\` ADD \`eta_note\` text;`)
  await db.run(sql`ALTER TABLE \`cars_locales\` ADD \`auction_note\` text;`)
}
