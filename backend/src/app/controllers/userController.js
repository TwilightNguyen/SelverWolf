import { ctx } from '../context';
import { users, selectUserSchema } from '../../config/db/schema/user';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

const responseSchema = t.Object({
  message: t.String(),
  task: t.Optional(selectUserSchema),
});

export const usersController = new Elysia({ prefix: '/users' }).use(ctx).get(
  '/',
  async ({ db }) => {
    const usersList = await db().select().from(users);
    console.log(usersList);
    return usersList;
  },
  {
    response: t.Array(selectUserSchema),
  },
);
