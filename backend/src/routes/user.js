import { Elysia } from "elysia";

import { SignInModel } from '../app/models/SignInModel';

//Define Plugin
export const user = new Elysia() 
    .group('/user', route => route
        .post('/sign-in', ({body}) => body, {
            body: SignInModel,
            response: SignInModel
        })
        .post('/sign-up', () => 'Sign up Routes')
        .post('/profile', () => 'Profile Routes')
        .get('/:id', ({ params: {id}}) => 'Get User ID Routes')
    )

