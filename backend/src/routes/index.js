import { Elysia } from "elysia";

import { user } from "./user";
import { message } from './message';

//Define Plugin
export const route = new Elysia()
    .state('plugin-version', 1)
    .use(user)
    .use(message)


