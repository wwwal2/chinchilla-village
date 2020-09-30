import { hot } from 'react-hot-loader/root';
import React from 'react';

const text = 'Chinchilla village';

const App: React.FC = () => (
  <div>
    <h4>
      {text}
    </h4>
  </div>
);

export default hot(App);
