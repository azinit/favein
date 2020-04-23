import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { updateState } from 'store/shared/slice';
import Loader from 'components/loader'
import Header from 'components/header'
import { fetchAll } from 'api'
import './app.scss'

const HomePage = React.lazy(() => import('./home'))
const UserPage = React.lazy(() => import('./user'))
const AdminPage = React.lazy(() => import('./admin'))
const UsersPage = React.lazy(() => import('./users'))
const DashboardPage = React.lazy(() => import('./dashboard'))

// TODO: withAuth
// TODO: withStore
// TODO: withRouting

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAll().then(r => dispatch(updateState({ entries: r })))
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
