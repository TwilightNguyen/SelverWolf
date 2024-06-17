import { and, eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

import { ctx } from '../../context';
import { users, selectUserSchema } from '../../config/db/schema/user';

const responseSchema = t.Object({
  message: t.String(),
  task: t.Optional(selectUserSchema),
});

export const usersController = new Elysia()
.use(ctx)
.post('/login',async ({db,body})=>{
  const usersList = 
  await db()
  .select()
  .from(users)
  .where(
    and(
      eq(users.email, body.email), 
      eq(users.password, body.password)
  ));
  //console.log(usersList);
  return usersList;
}).get('/:email',
async ({ db, params: {email} }) => {
  const usersList = await db().select().from(users).where(eq(users.email, email));
  //console.log(usersList);
  return usersList;
},
{
  response: t.Array(selectUserSchema),
},
);
