import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/configStore';
import { DOMAIN } from './util/settings/config';
import * as signalR from '@aspnet/signalr'
import './i18n' 
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



reportWebVitals();
