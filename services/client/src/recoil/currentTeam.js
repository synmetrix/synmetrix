import { atom, selector } from 'recoil';
import { currentUserAtom } from './currentUser';

const currentTeamAtom = atom({
  key: 'currentTeamAtom',
  default: null,
});

const currentTeamSelector = selector({
  key: 'currentTeam',
  get: ({ get }) => {
    const userAtomValue = get(currentUserAtom);
    const teamAtomValue = get(currentTeamAtom);

    const defaultTeam = userAtomValue?.users_by_pk?.members?.[0]?.team;

    return teamAtomValue || defaultTeam || {};
  },
  set: ({ set }, team) => {
    set(currentTeamAtom, team);
  }
});

export default currentTeamSelector;
