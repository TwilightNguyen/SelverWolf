import { Elysia } from "elysia";

import {usersController} from '../app/controllers/UserController';

//Define Plugin
export const user = new Elysia({
    prefix: '/api',
  }).use(usersController);

