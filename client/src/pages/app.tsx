import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loader from '../components/loader'
import './app.scss'

const HomePage = React.lazy(() => import('./home'))
const ProfilePage = React.lazy(() => import('./profile'))
const AdminPage = React.lazy(() => import('./admin'))

function App() {
  return (
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
  );
}

export default App;
