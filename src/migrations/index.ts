import * as migration_20260908_120337_initial from './20260908_120337_initial';

export const migrations = [
  {
    up: migration_20260908_120337_initial.up,
    down: migration_20260908_120337_initial.down,
    name: '20260908_120337_initial'
  },
];
