import {
  useRecoilState,
} from 'recoil';

import currentTeamSelector from '../recoil/currentTeam';

export default () => {
  const [currentTeamState, setCurrentTeamState] = useRecoilState(currentTeamSelector);

  return {
    currentTeamState,
    setCurrentTeamState,
  };
};
