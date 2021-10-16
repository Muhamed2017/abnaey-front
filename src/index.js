import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import configureStore from './redux/reducers/store';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

