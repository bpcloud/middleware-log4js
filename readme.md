# logger middleware in bpframework.

### Middleware specification

https://github.com/bpcloud/middleware


#### Setup.

```js
import { Application } from 'bpframework';
import * as middleware_logger from '@bpframework/middleware-log4js';

Application.use(middleware_logger.middleware)
Application.runKoa(...);
```

#### Config.

```properties
bp:
  # feign client log (none, basic, headers, full).
  feignLoggingLevel: full # full
  # restController log (none, basic, headers, full).
  restControllerLoggingLevel: full # full
  # logger dir
  loggerDir: 
```


#### Usage.

```
Application.getLogger().info(...);
```