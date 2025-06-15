import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from "./routes";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { configureAxios } from './utils/configureAxios';
configureAxios();

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};
