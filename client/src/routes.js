import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'

// Components
import Layout from './hoc/layout'
import Home from './components/Home'
import Restaurant from './components/Restaurant'


class App extends Component {

  render(){
    return (
      <Layout>
        <Switch>
          <Route path="/:restaurant" exact component={Restaurant}/>
          <Route path="/" exact component={Home}/>
        </Switch>
      </Layout>
    )
  }
}

export default App;
