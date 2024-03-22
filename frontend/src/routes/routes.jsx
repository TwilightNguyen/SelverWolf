

import config from '../config';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login';
import Setting from '../pages/Setting';
import About from '../pages/About';

//public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.login, component: Login },
    { path: config.routes.setting, component: Setting },
    { path: config.routes.about, component: About },
];

const privateRoles = [];

export { publicRoutes, privateRoles };


// const privateRoles = [];

// export { publicRoutes, privateRoles };

// import { Switch, Route } from 'react-router-dom';

// const ROUTES = import.meta.globEager('~/pages/**/[a-z[]*.jsx] */');

// const routes = Object.keys(ROUTES).map((route) => {
//     const path = route
//         .replace(/\/src\/pages|index|\.jsx$/g,'') 
//         .replace(/\[\.{3}.+\]/,'*') 
//         .replace(/\[{.+}\]/,':$1');
//     return {path, component: ROUTES[route].default};
// });

// export const Routes = () => {
//     return (
//         <Switch>
//             {
//                 routes.map(({ path, component : Component = Fragment }) => (
//                     <Route key={path} path={path} component={Component} exact={true} />
//                 ))
//             }
//         </Switch>
//     );
// }
