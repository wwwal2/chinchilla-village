import { hot } from 'react-hot-loader/root';
import React from 'react';

const fff = 'Chinchilla village';

const App: React.FC = () => (
  <div>
    <h4>
      {fff}
    </h4>
  </div>
);

export default hot(App);
