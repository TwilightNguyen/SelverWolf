import { Elysia } from "elysia";


//Define Plugin
const plugin = new Elysia()
.state('plugin-version', 1)
.get('/form-plugin', () => 'Hi')
.get('/greet', () => 'Hello Dev!');


//Application
const app = new Elysia().get("/", () => "Hello Elysia")
.use(plugin)
.state('version', 1)
.decorate('getDate',() => Date.now())
.get('/post/:id',({store, params: { id }}) => { 
  console.log(store['plugin-version']);
  return { id }
})
.post('/post', ({ body }) => {
  //set.status = 201
  return body
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
