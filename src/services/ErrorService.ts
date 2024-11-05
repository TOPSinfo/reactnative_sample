import axios from 'axios';
import Config from '@config/Config';

export const ErrorService = {
  apiLogError: (err: any) => {
    if (
      Config.handleErrors &&
      err.response.status !== 401 &&
      err.response.status !== 499
    ) {
      axios.post(
        `${Config.logBucketUrl}/api/error`,
        {
          project: 'qp',
          type: 'network',
          message: {
            stack: err.stack,
            response: err.response,
          },
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  },
};
