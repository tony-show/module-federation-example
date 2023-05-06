import { createRoot } from 'react-dom/client';
import App from './App';

import { StoreProvider } from 'host/store'

const domNode = document.getElementById('root')!
const root = createRoot(domNode);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
