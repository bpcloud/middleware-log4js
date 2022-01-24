'use strict';

/**
 * Copyright (c) 2021 Copyright bpframework All Rights Reserved.
 * Author: brian.li
 * Date: 2021-03-11 13:53
 * Desc:
 */

import initiator from './libs/initiator';

export const name = 'middleware-logger';

export const middleware = {
  type: 'koa',
  name: name,
  initiator,
};
