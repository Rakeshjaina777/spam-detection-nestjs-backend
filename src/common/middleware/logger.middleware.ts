// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    const start = Date.now();

    // Attach requestId to req for future usage
    (req as any).requestId = requestId;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const user = (req as any).user;

      const log = {
        timestamp: new Date().toISOString(),
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: duration,
        userId: user?.userId || null,
      };

      console.log(JSON.stringify(log));
    });

    next();
  }
}
