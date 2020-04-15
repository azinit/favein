import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './app.scss'

const HomePage = React.lazy(() => import('./home'))
const ProfilePage = React.lazy(() => import('./profile'))
const AdminPage = React.lazy(() => import('./admin'))

function App() {
  return (
    <div className="favein-app">
      <BrowserRouter>
        <React.Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/admin" component={AdminPage} />
            <Redirect to="home" />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
