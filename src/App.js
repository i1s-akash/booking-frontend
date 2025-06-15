import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from "./routes";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { configureAxios } from './utils/configureAxios';
configureAxios();

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};
