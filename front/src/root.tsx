import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { App } from './App.tsx';
import { apolloClient } from './graphql/client.ts';
import { Provider as JotaiProvider } from 'jotai';
import { DeliveriesProvider } from './context/DeliveriesContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ApolloProvider client={apolloClient}>
          <DeliveriesProvider>
            <App />
          </DeliveriesProvider>
      </ApolloProvider>
    </JotaiProvider>
  </React.StrictMode>
);
