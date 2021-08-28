import {
  useRecoilState,
} from 'recoil';

import { currentUserAtom } from '../recoil/currentUser';

export default () => {
  const [currentUserState, setCurrentUserState] = useRecoilState(currentUserAtom);

  return {
    currentUserState,
    setCurrentUserState,
  };
};
