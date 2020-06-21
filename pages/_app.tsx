import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';

import { useApollo } from 'lib/apolloClient';
import { useStore } from '../lib/redux';

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
