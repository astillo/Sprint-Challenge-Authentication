import React from 'react';
import Form from './components/Forms'
import Login from './components/login'
import Jokes from './components/jokes'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Route path='/' exact component={Form} />
      <Route path='/login' component={Login} />
      <Route path='/jokes' component={Jokes} />
    </Router>

  );
}

export default App;
