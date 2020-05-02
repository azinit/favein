import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { updateState } from 'store/shared/slice';
import Loader from 'components/loader'
import Header from 'components/header'
import { fetchAll } from 'api'
import './app.scss'

const HomePage = lazy(() => import('./home'))
const UserPage = lazy(() => import('./user'))
const AdminPage = lazy(() => import('./admin'))
const UsersPage = lazy(() => import('./users'))
const DashboardPage = lazy(() => import('./dashboard'))
const CardPage = lazy(() => import('./card'))

// TODO: withAuth
// TODO: withStore
// TODO: withRouting

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAll().then(r => dispatch(updateState({ entities: r })))
  }, [])

  return (
    <div className="favein-app">
      <Header />
      <BrowserRouter>
        <React.Suspense fallback={<Loader className="overlay" />}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="/cards/:id" component={CardPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/dashboards/:id" component={DashboardPage} />
            <Redirect to="admin" />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
