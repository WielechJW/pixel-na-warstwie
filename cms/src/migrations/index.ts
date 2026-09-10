import * as migration_20260910_131225_initial from './20260910_131225_initial';

export const migrations = [
  {
    up: migration_20260910_131225_initial.up,
    down: migration_20260910_131225_initial.down,
    name: '20260910_131225_initial'
  },
];
