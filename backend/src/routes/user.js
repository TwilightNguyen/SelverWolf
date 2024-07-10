import Elysia , { t }  from "elysia";
import { ctx } from '../context';

import {  selectUserSchema } from '../config/db/schema/user';
import * as UsersController from '../app/controllers/UserController';


//Define Plugin
export const user = new Elysia()
.use(ctx)
.group('/user', route => route
  .get('/',() => {return 'Whale User API'})
  .post('/login', 
    ({db,body}) => UsersController.login(db,body),
    {
      response: t.Array(selectUserSchema),
    },
  )
  .get('/:email', 
    ({db, params: {email}}) => UsersController.getUser(db,email),
    {
      response: t.Array(selectUserSchema),
    },)
);

