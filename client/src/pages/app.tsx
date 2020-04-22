import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { store } from 'store';
import Loader from 'components/loader'
import Header from 'components/header'
import './app.scss'

const HomePage = React.lazy(() => import('./home'))
const UserPage = React.lazy(() => import('./user'))
const AdminPage = React.lazy(() => import('./admin'))
const UsersPage = React.lazy(() => import('./users'))

// TODO: withAuth
// TODO: withStore
// TODO: withRouting

function App() {
  return (
    <Provider store={store}>
      <div className="favein-app">
        <Header/>
        <BrowserRouter>
          <React.Suspense fallback={<Loader className="overlay" />}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/users/:id" component={UserPage} />
              <Route path="/users" component={UsersPage} />
              <Redirect to="admin" />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
