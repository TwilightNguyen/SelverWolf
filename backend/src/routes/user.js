import { Elysia } from "elysia";

import {usersController} from '../app/controllers/UserController';

//Define Plugin
export const user = new Elysia()
.group('/user', route => route
  .get('/', '')
  .use(usersController));

