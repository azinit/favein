import React, { lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from 'components/loader'
import API from 'api'
import './app.scss'

const HomePage = lazy(() => import('./home'))
const UserPage = lazy(() => import('./user'))
const AdminPage = lazy(() => import('./admin'))
const UsersPage = lazy(() => import('./users'))
const DashboardPage = lazy(() => import('./dashboard'))
const CardPage = lazy(() => import('./card'))
const LabelsPage = lazy(() => import('./labels'))
const SignInPage = lazy(() => import('./auth/sign-in'))
const SignUpPage = lazy(() => import('./auth/sign-up'))
const FavesPage = lazy(() => import('./faves'))
const UserCardsPage = lazy(() => import('./user-cards'))

// TODO: withAuth
// TODO: withStore
// TODO: withRouting

function App() {
  const { isAuth, token = "", current } = useSelector((state: IGlobalState) => state.auth)
  API.init(token)
  return (
    <div className="favein-app">
      <BrowserRouter>
        <React.Suspense fallback={<Loader className="overlay" />}>
          {
            isAuth ?
              (
                <Switch>
                  <Route path="/home" component={HomePage} />
                  <Route path="/admin" component={AdminPage} />
                  <Route path="/users/:id" component={UserPage} />
                  <Route path="/cards/:id" component={CardPage} />
                  <Route path="/users" component={UsersPage} />
                  <Route path="/labels" component={LabelsPage} />
                  <Route path="/dashboards/:id" component={DashboardPage} />
                  <Route path="/faves" component={FavesPage} />
                  <Route path="/user-cards" component={UserCardsPage} />
                  <Redirect to={`/users/${current?.id}`} />
                </Switch>
              ) : (
                <Switch>
                  <Route path="/home" component={HomePage} />
                  <Route path="/auth/sign-in" component={SignInPage} />
                  <Route path="/auth/sign-up" component={SignUpPage} />
                  <Redirect to="/auth/sign-in" />
                </Switch>
              )
          }
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
