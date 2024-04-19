import { Elysia } from "elysia";

//Define Plugin
export const message = new Elysia() 
    .group('/message', route => route
        .get('/', () => 'Message box')
        .get('/:id', ({ params: {id}}) => 'Message Routes')
    )


