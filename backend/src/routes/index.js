import { Elysia } from "elysia";

import { user } from "./user";
import { message } from './message';

//Define Plugin
export const routes = new Elysia()
    .state('plugin-version', 1)
    .group('/api', route => route
        .get('/','')
        .use(user)
        .use(message)
    );
    


