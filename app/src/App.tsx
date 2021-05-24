import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
import { AuthModal } from './components/Auth/AuthModal/AuthModal'
import { AutoLogin } from './components/Auth/AutoLogin/AutoLogin'
// Screens
import { Home } from './screens/Home'
import { About } from './screens/About'

export const App: FC = () => (
  <Router>
    <Navigation
      links={[
        { href: '/', content: 'Home' },
        { href: '/about', content: 'About' },
      ]}
    />

    <AuthModal />
    <AutoLogin />

    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  </Router>
)
