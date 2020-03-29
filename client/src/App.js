import React from 'react';
import Items from './components/itemList'
import Navigation from './components/nav'
import AddItem from './components/addItem'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Navigation />
      <Items/>
      <AddItem />
    </div>
    </ApolloProvider>
  );
}

export default App;
