/// <reference types="node" />
interface BpframeworkMiddleware {
  type: string;
  name: string;
  afterRoute: (app: any) => Promise<boolean>;
  beforeRoute: (app: any) => Promise<boolean>;
  initiator: (app: any) => void;
}

export const name: string;

export const middleware: BpframeworkMiddleware;

export interface BpLogger {
  error(...msg: any[]): any;
  info(...msg: any[]): any;
  warn(...msg: any[]): any;
  debug(...msg: any[]): any;
}

declare global {
  /**
   * @desc: 获取日志对象.
   */
  function getLogger(): BpLogger;
}
