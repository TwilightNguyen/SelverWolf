
import { Switch, Route } from 'react-router-dom';

const ROUTES = import.meta.globEager('/src/pages/**/[a-z[]*.jsx] */');

const routes = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.jsx$/g,'') 
        .replace(/\[\.{3}.+\]/,'*') 
        .replace(/\[{.+}\]/,':$1');
    return {path, component: ROUTES[route].default};
});

export const Routes = () => {
    return (
        <Switch>
            {
                routes.map(({ path, component : Component = Fragment }) => (
                    <Route key={path} path={path} component={Component} exact={true} />
                ))
            }
        </Switch>
    );
}