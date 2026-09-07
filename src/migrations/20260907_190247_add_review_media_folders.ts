import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_payload_folders_folder_type" ADD VALUE 'review-media';
  ALTER TABLE "review_media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "review_media" ADD CONSTRAINT "review_media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "review_media_folder_idx" ON "review_media" USING btree ("folder_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "review_media" DROP CONSTRAINT "review_media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_folders_folder_type" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_folders_folder_type";
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('car-media');
  ALTER TABLE "payload_folders_folder_type" ALTER COLUMN "value" SET DATA TYPE "public"."enum_payload_folders_folder_type" USING "value"::"public"."enum_payload_folders_folder_type";
  DROP INDEX "review_media_folder_idx";
  ALTER TABLE "review_media" DROP COLUMN "folder_id";`);
}
