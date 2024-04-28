import { ctx } from '../../context';
import { users, selectUserSchema } from '../../config/db/schema/user';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

const responseSchema = t.Object({
  message: t.String(),
  task: t.Optional(selectUserSchema),
});

export const usersController = new Elysia()
.use(ctx)
.get('/:email',
  async ({ db, params: {email} }) => {
    const usersList = await db().select().from(users).where(eq(users.email, email));
    console.log(usersList);
    return usersList;
  },
  {
    response: t.Array(selectUserSchema),
  },
);
