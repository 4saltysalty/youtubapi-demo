import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import FavoritesPage from './pages/favorites/favorites.component';
import Projectorpage from './pages/projector/projector.component';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/projector' component={Projectorpage} />
          <Route path='/projector/:youtubeId' component={Projectorpage} />
          <Route path='/favorites' component={FavoritesPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

