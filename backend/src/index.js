import { Elysia, t } from 'elysia'; 
import { cors } from '@elysiajs/cors';

import {routes} from './routes'

//Application
const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Joker')
  .get('/helloworld', () => 'Hello World!!')
  .use(routes)
  .state('version', 1)
  .decorate('getDate',() => Date.now())
  .get('/:id',({params: { id }}) => {  
    return { id }
  },{
    params: t.Object({
      id: t.Numeric()
    })
  });

app.listen(3000, (req, res)=>{
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});

