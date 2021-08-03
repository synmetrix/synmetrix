import { useEffect } from 'react';
import useLocation from 'wouter/use-location';
import { useTranslation } from 'react-i18next';

import { message } from 'antd';

const noop = () => {};
const DEFAULT_SUCCESS = 'Succefully finished';
const DEFAULT_FAILURE = 'Something went wrong';

const useCheckResponse = (response, cb = noop, meta = {}) => {
  const [, setLocation] = useLocation();

  const {
    successMessage = DEFAULT_SUCCESS,
    errorMessage = DEFAULT_FAILURE,
  } = meta;

  useEffect(() => {
    if (response.data) {
      if (successMessage) {
        message.success(successMessage);
      }

      cb(response.data);
      response.data = null;
    }
  },
    [response.data]
  );

  useEffect(() => {
    if (response.error) {
      const responseMessage = response.error?.message;

      if (responseMessage?.includes('JWSInvalidSignature')) {
        setLocation('/403');
      }

      message.error(responseMessage || errorMessage);
      cb(null, response.error);

      response.error = null;
    }
  },
    [response.error]
  );
};

export default useCheckResponse;
