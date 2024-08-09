
import { createContext, useCallback, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useToken } from './store';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
    const { token, setToken } = useToken();
  return (
    <Router>
        <Routes>
            {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
                let Page = route.component;
                
                if(route.component === Home && !token){
                    Page = Login;
                }


                if(Page === Login){
                    Layout = ({children}) => {
                        return <>
                            {children}
                        </>
                    };
                }

                return (
                    <Route
                        key={index}
                        path={route.path}
                        // element = {
                        //     route.component === Login || !token ? <Page setToken={setToken} /> : <Layout> <Page setToken={setToken}/> </Layout>
                        // }
                        element={
                            
                            <Layout>
                                {Page === Login && <Page setToken={setToken} />}
                                {Page !== Login && <Page setToken={setToken} />}
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    </Router>
  );
}

export default App;


// const pages = import.meta.glob('./pages/**/*.jsx', {eager: true });
// const routes = [];
// for(const path of Object.keys(pages)){
//   const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
//   if(!fileName){
//     continue;
//   }

//   const normalizedPathName = fileName.includes('$')
//   ? fileName.replace('$', ':')
//   : fileName.replace(/\/index/,'');

//   routes.push({
//     path: fileName === 'index' ? '/' : `${normalizedPathName.toLowerCase()}`,
//     Element: pages[path].default,
//     loader: pages[path]?.loader,
//     action: pages[path]?.action,
//     ErrorBoundary: pages[path]?.ErrorBoundary,
//   });
// }

// const router = createBrowserRouter(
//   routes.map(({ Element, ErrorBoundary, ...rest}) => ({
//     ...rest,
//     element: <Element />,
//     ...(ErrorBoundary && {errorElement: <ErrorBoundary />})
//   }))
// );

// function App() { 
//   return <RouterProvider router={router} />
// }

// export default App;
