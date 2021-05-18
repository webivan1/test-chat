import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation/Navigation'
// Screens
import { Home } from './screens/Home'
import { About } from './screens/About'
import { AuthModal } from './components/Auth/AuthModal/AuthModal'

export const App: FC = () => (
  <Router>
    <Navigation
      links={[
        { href: '/', content: 'Home' },
        { href: '/about', content: 'About' },
      ]}
    />

    <AuthModal />

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
