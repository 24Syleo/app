import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index.jsx';

import App from './App.jsx'
import './index.css'
import { getIpData } from './actions/IpAdressController.jsx';
import { getListCurrency } from './actions/CurrencyController.jsx';

//config store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

await store.dispatch(getIpData());
await store.dispatch(getListCurrency());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
