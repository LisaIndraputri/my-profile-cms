import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd';
import Spinner from './components/common/Spinner';
import './styles/App.scss'

import 'react-toastify/dist/ReactToastify.css';

const { Content, Footer } = Layout;

const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const ProjectCategory = React.lazy(() => import('./pages/ProjectCategory'))
const ProjectList = React.lazy(() => import('./pages/ProjectList'))

const Sidebar = React.lazy(() => import('./components/header/Sidebar'))
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute'))


function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Layout
            style={{
              minHeight: '100vh',
            }}
            className="main-layout"
          >
            {
              window.location.pathname !== '/login' ? <Sidebar /> : ''
            }
            <Layout className="site-layout">
              <Content className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route exact path='/login' element={<Login />}/>
                  <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path='/' element={<Home />}/>
                  </Route>
                  <Route exact path='/project-category' element={<PrivateRoute />}>
                    <Route exact path='/project-category' element={<ProjectCategory />}/>
                  </Route>
                  <Route exact path='/project-list' element={<PrivateRoute />}>
                    <Route exact path='/project-list' element={<ProjectList />}/>
                  </Route>
                </Routes>
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                }}
              >
                Website design and code by Lisa Indraputri
              </Footer>
            </Layout>
          </Layout>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
