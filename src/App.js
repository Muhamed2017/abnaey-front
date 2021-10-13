import './App.css';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './pages/authentication/Signup';
import Navigation from './components/Navigation';
import { connect } from 'react-redux';
import Home from './pages/Home';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
render(){  
  return (
      <ConfigProvider direction="rtl">
        <Navigation/>
      <Router>
        <Switch>
          <Route path="/signup" exact>
            {this.props.isLoggedIn ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/" exact component={Home}/>
          </Switch>
          </Router>
  </ConfigProvider>
  );
}
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.regularUser.isLoggedIn,
  }
}
export default connect(mapStateToProps)(App);
