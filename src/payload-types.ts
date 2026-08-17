/* tslint:disable */
/* eslint-disable */

// TODO: hand-written stand-in — `payload generate:types` fails with
// ERR_REQUIRE_ASYNC_MODULE (payloadcms/payload#16378). When fixed upstream,
// delete this file and run `npm run generate:types`.

export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
  };
}

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    cars: Car;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: Record<string, unknown>;
    media: Record<string, unknown>;
    cars: Record<string, unknown>;
    'payload-locked-documents': Record<string, unknown>;
    'payload-preferences': Record<string, unknown>;
    'payload-migrations': Record<string, unknown>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  jobs: {
    tasks: {};
    workflows: {};
  };
  locale: 'uk' | 'en';
  user: User & { collection: 'users' };
}

export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}

export interface Media {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export interface Car {
  id: number;
  slug: string;
  vin?: string | null;
  title: string;
  description?: string | null;
  features?:
    | {
        value: string;
        id?: string | null;
      }[]
    | null;
  status: 'available' | 'inTransit' | 'auction';
  featured?: boolean | null;
  gallery: {
    image: number | Media;
    id?: string | null;
  }[];
  year: number;
  mileageKm: number;
  engine: string;
  drivetrain: 'AWD' | '4WD' | 'FWD' | 'RWD';
  transmission: 'automatic' | 'manual';
  damageTag?: string | null;
  locationNote?: string | null;
  etaNote?: string | null;
  auctionNote?: string | null;
  currentBid?: number | null;
  price: number;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'cars';
        value: number | Car;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}

export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?: unknown;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
