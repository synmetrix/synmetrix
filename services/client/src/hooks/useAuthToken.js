import {
  useRecoilState,
} from 'recoil';

import { currentToken } from '../recoil/currentUser';
import useLocation from './useLocation';

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentToken);
  const [, setLocation] = useLocation();

  const doAuth = jwtToken => {
    setAuthToken(jwtToken);
    setLocation('/d/sources');
  };

  return {
    authToken,
    setAuthToken,
    doAuth,
  };
};
