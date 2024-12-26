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
  .post('/register', 
    ({db,body}) => UsersController.register(db,body),
    {
      response: t.Array(selectUserSchema),
    },
  )
  .get('/:id/:email', 
    ({db, params: {id, email}}) => UsersController.getUser(db,id,email),
    {
      response: t.Array(selectUserSchema),
    },)
);

