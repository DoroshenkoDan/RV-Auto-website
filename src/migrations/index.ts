import * as migration_20260908_120337_initial from './20260908_120337_initial';
import * as migration_20260916_154037_remove_car_notes from './20260916_154037_remove_car_notes';

export const migrations = [
  {
    up: migration_20260908_120337_initial.up,
    down: migration_20260908_120337_initial.down,
    name: '20260908_120337_initial',
  },
  {
    up: migration_20260916_154037_remove_car_notes.up,
    down: migration_20260916_154037_remove_car_notes.down,
    name: '20260916_154037_remove_car_notes'
  },
];
