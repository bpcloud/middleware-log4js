'use strict';

/**
 * Copyright (c) 2021 Copyright bpframework All Rights Reserved.
 * Author: brian.li
 * Date: 2021-03-11 13:13
 * Desc:
 */

import { logger } from './logger';

function refreshRemoteEventlistener(ev: any /*: RefreshRemoteEvent*/) {
  if (
    ev.isContainUpdated('spring.application.name') ||
    ev.isContainUpdated('bp.loggerDir')
  ) {
    logger.install(
      ev.latestConfigs['spring.application.name'] || 'service',
      ev.latestConfigs['bp.loggerDir']
    );
  }
}

export default function (app: any, bpApp: any) {
  bpApp._addRefreshRemoteEventListener(refreshRemoteEventlistener);

  logger.install(
    bpApp.getConfig()['spring.application.name'] || 'service',
    bpApp.getConfig()['bp.loggerDir']
  );
  bpApp.setLogger(logger);
}
