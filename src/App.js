import './App.css';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './pages/authentication/Signup';
import Navigation from './components/Navigation';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Application from './pages/Application';
import Signin from './pages/authentication/Signin';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
render(){  
  return (
      <ConfigProvider direction="rtl">
        {/* <Navigation/> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact>
            {this.props.isLoggedIn ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/signin" exact>
            {this.props.isLoggedIn ? <Redirect to="/" /> : <Signin />}
          </Route>
          <Route path="/application" exact>
            {this.props.isLoggedIn ? <Application /> : <Redirect to="/signin" />}
      </Route>
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
