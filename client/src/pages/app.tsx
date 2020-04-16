import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loader from '../components/loader'
import './app.scss'
import { store } from '../store';

const HomePage = React.lazy(() => import('./home'))
const ProfilePage = React.lazy(() => import('./profile'))
const AdminPage = React.lazy(() => import('./admin'))

// TODO: withAuth
// TODO: withStore
// TODO: withRouting

function App() {
  return (
    <Provider store={store}>
      <div className="favein-app">
        <BrowserRouter>
          <React.Suspense fallback={<Loader className="overlay" />}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/admin" component={AdminPage} />
              <Redirect to="admin" />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
