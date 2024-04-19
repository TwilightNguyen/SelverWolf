import { Elysia, t } from 'elysia';

import { plugin } from './plugin';
import {route} from './routes'

//Application
const app = new Elysia().get('/', () => 'Hello Elysia')
  .use(route)
  .state('version', 1)
  .decorate('getDate',() => Date.now())
  .get('/:id',({params: { id }}) => {  
    return { id }
  },{
    params: t.Object({
      id: t.Numeric()
    })
  })
  .post('/post', ({ body }) => {
    //set.status = 201
    return body
  });


app.group('v1',app=> app
  .get('/', () => 'version 1')
  .group('/products', app => app)
  .post('/', () => 'Create Product')
  .get('/:id', () => 'GET PRODUCT BY ID')
  .put('/:id', () => 'Update product by ID')
  .delete('/:id', () => 'Delete Product by ID')
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
