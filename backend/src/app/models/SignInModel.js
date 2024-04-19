import {t} from 'elysia';

export const SignInModel = t.Object({
    email: t.String(),
    password: t.String()
})
