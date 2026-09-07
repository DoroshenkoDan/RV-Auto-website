import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('car-media');
  CREATE TABLE "car_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "car_media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "team_media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "review_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "review_media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cars_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"car_media_id" integer
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "cars" ADD COLUMN "photo_folder_id" integer;
  ALTER TABLE "team" ADD COLUMN "photo_id" integer;
  DELETE FROM "reviews";
  ALTER TABLE "reviews" ADD COLUMN "photo_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "car_media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "review_media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "car_media" ADD CONSTRAINT "car_media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "car_media_locales" ADD CONSTRAINT "car_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_media_locales" ADD CONSTRAINT "team_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "review_media_locales" ADD CONSTRAINT "review_media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."review_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_car_media_fk" FOREIGN KEY ("car_media_id") REFERENCES "public"."car_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "car_media_folder_idx" ON "car_media" USING btree ("folder_id");
  CREATE INDEX "car_media_updated_at_idx" ON "car_media" USING btree ("updated_at");
  CREATE INDEX "car_media_created_at_idx" ON "car_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "car_media_filename_idx" ON "car_media" USING btree ("filename");
  CREATE UNIQUE INDEX "car_media_locales_locale_parent_id_unique" ON "car_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_media_updated_at_idx" ON "team_media" USING btree ("updated_at");
  CREATE INDEX "team_media_created_at_idx" ON "team_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_media_filename_idx" ON "team_media" USING btree ("filename");
  CREATE UNIQUE INDEX "team_media_locales_locale_parent_id_unique" ON "team_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "review_media_updated_at_idx" ON "review_media" USING btree ("updated_at");
  CREATE INDEX "review_media_created_at_idx" ON "review_media" USING btree ("created_at");
  CREATE UNIQUE INDEX "review_media_filename_idx" ON "review_media" USING btree ("filename");
  CREATE UNIQUE INDEX "review_media_locales_locale_parent_id_unique" ON "review_media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cars_rels_order_idx" ON "cars_rels" USING btree ("order");
  CREATE INDEX "cars_rels_parent_idx" ON "cars_rels" USING btree ("parent_id");
  CREATE INDEX "cars_rels_path_idx" ON "cars_rels" USING btree ("path");
  CREATE INDEX "cars_rels_car_media_id_idx" ON "cars_rels" USING btree ("car_media_id");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  ALTER TABLE "cars" ADD CONSTRAINT "cars_photo_folder_id_payload_folders_id_fk" FOREIGN KEY ("photo_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_team_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."team_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_photo_id_review_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."review_media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_car_media_fk" FOREIGN KEY ("car_media_id") REFERENCES "public"."car_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_media_fk" FOREIGN KEY ("team_media_id") REFERENCES "public"."team_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_review_media_fk" FOREIGN KEY ("review_media_id") REFERENCES "public"."review_media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cars_photo_folder_idx" ON "cars" USING btree ("photo_folder_id");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "reviews_photo_idx" ON "reviews" USING btree ("photo_id");
  CREATE INDEX "payload_locked_documents_rels_car_media_id_idx" ON "payload_locked_documents_rels" USING btree ("car_media_id");
  CREATE INDEX "payload_locked_documents_rels_team_media_id_idx" ON "payload_locked_documents_rels" USING btree ("team_media_id");
  CREATE INDEX "payload_locked_documents_rels_review_media_id_idx" ON "payload_locked_documents_rels" USING btree ("review_media_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "car_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "car_media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "review_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "review_media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cars_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "car_media" CASCADE;
  DROP TABLE "car_media_locales" CASCADE;
  DROP TABLE "team_media" CASCADE;
  DROP TABLE "team_media_locales" CASCADE;
  DROP TABLE "review_media" CASCADE;
  DROP TABLE "review_media_locales" CASCADE;
  DROP TABLE "cars_rels" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  ALTER TABLE "cars" DROP CONSTRAINT "cars_photo_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "team" DROP CONSTRAINT "team_photo_id_team_media_id_fk";
  
  ALTER TABLE "reviews" DROP CONSTRAINT "reviews_photo_id_review_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_car_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_review_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  DROP INDEX "cars_photo_folder_idx";
  DROP INDEX "team_photo_idx";
  DROP INDEX "reviews_photo_idx";
  DROP INDEX "payload_locked_documents_rels_car_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_review_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  ALTER TABLE "cars" DROP COLUMN "photo_folder_id";
  ALTER TABLE "team" DROP COLUMN "photo_id";
  ALTER TABLE "reviews" DROP COLUMN "photo_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "car_media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "review_media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  DROP TYPE "public"."enum_payload_folders_folder_type";`);
}
