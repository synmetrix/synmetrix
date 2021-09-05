import { atom, selector } from 'recoil';

import { removeTeam, saveTeam, getTeam } from '../utils/storage';

const currentTeamAtom = atom({
  key: 'currentTeamAtom',
  default: getTeam(),
});

const currentTeamSelector = selector({
  key: 'currentTeam',
  get: ({ get }) => get(currentTeamAtom),
  set: ({ set }, team) => {
    removeTeam();
    saveTeam(team);

    set(currentTeamAtom, team);
  }
});

export default currentTeamSelector;
