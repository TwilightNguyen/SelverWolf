import { and, eq,or } from 'drizzle-orm';
// import Elysia, { t } from 'elysia';

// import { ctx } from '../../context';
import { users } from '../../config/db/schema/user';
import { error } from 'elysia';
import { password } from 'bun';

// const responseSchema = t.Object({
//   message: t.String(),
//   task: t.Optional(selectUserSchema),
// });

export const login = async (db,body) => { 
    const usersList = 
    await db()
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, body.email), 
        eq(users.password, body.password)
    ));
    // console.log(usersList);
    return usersList;
};

export const register = async (db,body) => { 
  try{
    const response = await db().insert(users).values({
        username: `${body.userName}`,
        email: `${body.email}`,
        gender: `${body.gender}`,
        birthday: new Date(body.birthDay),
        password: `${body.password}`
    });
    return response;
  }catch(error){
      console.log(error);
      return error;
  }
};


export const getUser = async(db, id, email) => {
  try{
    const usersList = 
      await db()
        .select()
        .from(users)
        .where(
          or(
            email&&eq(users.email, email),
            id&&eq(users.id, +id)
          )
        );
    //console.log(usersList);
    return usersList;
  }
  catch(error){
    return error;
  }
}
