import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts';
import './App.css';

function App() {
  return (
      <Router>
          <Routes>
              {publicRoutes.map((route, index) => {
                  let Layout = DefaultLayout;
                    console.log(route.component);
                  const Page = route.component;
                  return (
                      <Route
                          key={index}
                          path={route.path}
                          element={
                              <Layout>
                                  <Page />
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
