import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthPaper from './components/auth-paper';

console.log(process.env.REACT_APP_CONVEX_URL);
const convex = new ConvexReactClient(`https://useful-fish-638.convex.cloud` as string);


(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '664e2172b978e20fc74c2e30',
    context: {
      kind: 'user',
      key: 'example-user-key',
      name: 'Sandy',
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <ConvexProvider client={convex}>
        <LDProvider>
          <AuthPaper><App /></AuthPaper>
        </LDProvider>
      </ConvexProvider>
    </React.StrictMode>,
  );
})();