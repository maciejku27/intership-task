import { concatURL } from '@utils/concatURL';
import { basePath } from './base.path';

export const pagePath = {
  base: basePath.origin,
  home: concatURL('/home', basePath.origin),
  policy: concatURL('/policy', basePath.origin),
  steps: concatURL('/steps', basePath.origin),

  // error url for creating links
  error: (code = 404) => concatURL(`/error/${code}`, basePath.origin),
  // error url for routing
  __error: concatURL('/error/:code', basePath.origin),
};
