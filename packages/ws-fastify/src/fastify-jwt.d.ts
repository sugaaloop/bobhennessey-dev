import '@fastify/jwt';
import { ApiUser } from './models/apiUser';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: ApiUser; // user type is return type of `request.user` object
  }
}
