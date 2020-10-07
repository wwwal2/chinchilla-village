import { hot } from 'react-hot-loader/root';
import React from 'react';
import './App.scss';
import chinchillas from './images/chinchillas_types.png';
import { Field } from './components/Field';

const text = 'Chinchilla types';

const App: React.FC = () => (
  <div>
    <h4>
      {text}
    </h4>
    <img src={chinchillas} />
    <Field />
  </div>
);

export default hot(App);
