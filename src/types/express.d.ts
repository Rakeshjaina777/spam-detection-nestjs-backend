            // src/types/express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      userId: string;
      phone: string;
      role: string;
    };
  }
}
