import { PrismaClient } from '@prisma/client';

/**
 * this code creates a prisma client to interact with database. 
 * For production we create a client every time.
 * In development we make sure it's a "singleton" because of hot reloading consume resources. 
 */

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ['query'] });
  }
  prisma = global.prisma;
}

export default prisma;




