import React from 'react';
import Items from './itemList'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <h1>Sell Items</h1>
      </header>
      <Items/>
    </div>
    </ApolloProvider>
  );
}

export default App;
