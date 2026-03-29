import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
