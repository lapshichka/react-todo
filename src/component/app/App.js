import React from 'react';
import Header from '../newTaskForm/NewTaskForm';
import Main from '../main/Main';
import './app.css';

const App = () => {
  return (
    <section class='todoapp'>
      <Header />
      <Main />
    </section>
  );
};

export default App;
