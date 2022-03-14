'use strict';

/**
 * Copyright (c) 2017 Copyright tj All Rights Reserved.
 * Author: lipengxiang
 * Date: 2017-06-16
 * Desc:
 */

import 'febs';
import * as log4js from 'log4js';
import * as path from 'path';
import { Application } from 'bpframework';

export const logger = {
  /**
   * @desc: 初始化日志系统
   */
  install,

  error,
  info,
  warn,
  debug,
};

function getMsg(...msg: any[]) {
  let m = '';
  if (msg) {
    for (let i = 0; i < msg.length; i++) {
      let e = msg[i];
      let t = typeof e;
      if (t === 'string') {
        m += e;
      } else if (t === 'function') {
        m += e.toString();
      } else {
        try {
          m += JSON.stringify(e);
        } catch (ee) {
          m += '[JSON.stringify error]';
        }
      }

      m += ' ';
    }
  }
  return m;
}

function error(...msg: any[]) {
  let m = getMsg(msg);
  let logger1 = log4js.getLogger('error');
  logger1.error(m);
}
function info(...msg: any[]) {
  let m = getMsg(msg);
  let logger1 = log4js.getLogger('info');
  logger1.info(m);
}
function warn(...msg: any[]) {
  let m = getMsg(msg);
  let logger1 = log4js.getLogger('warn');
  logger1.warn(m);
}
function debug(...msg: any[]) {
  if (__debug) {
    let m = getMsg(msg);
    let logger1 = log4js.getLogger('debug');
    logger1.debug(m);
  }
}

/**
 * @desc: 初始化日志模块.
 * @param name: 日志模块名.
 * @param logDir: 日志文件存储的目录
 * @return:
 */
function install(name: string, logDir: string = null) {
  global.getLogger = function () {
    return Application.getLogger();
  };

  let cfg;

  if (!logDir) {
    cfg = {
      appenders: {
        everything: { type: 'console' },
        debug: { type: 'console' },
        error: { type: 'console' },
        warn: { type: 'console' },
      },
      categories: {
        default: { appenders: ['everything'], level: 'INFO' },
        info: { appenders: ['everything'], level: 'INFO' },
        debug: { appenders: ['debug'], level: 'DEBUG' },
        error: { appenders: ['error'], level: 'ERROR' },
        warn: { appenders: ['warn'], level: 'WARN' },
      },
      disableClustering: true,
    };
  } else {
    logDir = path.join(logDir, name);
    cfg = {
      appenders: {
        everything: {
          type: 'dateFile',
          filename: logDir,
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true,
        },
        debug: {
          type: 'dateFile',
          filename: logDir,
          pattern: 'yyyy-MM-dd.debug',
          alwaysIncludePattern: true,
        },
        error: {
          type: 'dateFile',
          filename: logDir,
          pattern: 'yyyy-MM-dd.err',
          alwaysIncludePattern: true,
        },
        warn: {
          type: 'dateFile',
          filename: logDir,
          pattern: 'yyyy-MM-dd.warn',
          alwaysIncludePattern: true,
        },
      },
      categories: {
        default: { appenders: ['everything'], level: 'INFO' },
        info: { appenders: ['everything'], level: 'INFO' },
        debug: { appenders: ['debug'], level: 'DEBUG' },
        error: { appenders: ['error'], level: 'ERROR' },
        warn: { appenders: ['warn'], level: 'WARN' },
      },
      disableClustering: true,
    };
  }

  log4js.configure(cfg);

  console.log = info;
  console.debug = debug;
  console.error = error;
  console.warn = warn;
}
