import {
  useRecoilState,
} from 'recoil';

import { currentUserSelector } from '../recoil/currentUser';

export default () => {
  const [currentUserState, setCurrentUserState] = useRecoilState(currentUserSelector);

  return {
    currentUserState,
    setCurrentUserState,
  };
};
