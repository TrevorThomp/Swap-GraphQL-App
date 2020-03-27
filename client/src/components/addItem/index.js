import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks';

const ADD_ITEM = gql`
mutation AddItem($name: String!, $price: Int, $description: String!, $category: String!, $userID: ID!) {
  addItem(name: $name, price: $price, description: $description, category: $category, userID: $userID) {
    id
    name
    description
    price
    category
    user{
      username
    }
  }
}
`;

function AddItem(){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('')
  const [userID, setUserID] = useState('');
  const [addItem, { data }] = useMutation(ADD_ITEM);

  const handleSubmit = e => {
    e.preventDefault();
    addItem({ variables: { name: name, description: description, price: price, category: category, userID: userID } });
  }

  return(
    <form
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          onChange={e => setName(e.target.value)}
          placeholder="Item"
        />
        <input
          type='number'
          onChange={e => setPrice(parseInt(e.target.value))}
          placeholder="Price"
        />
        <input
          type='text'
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type='text'
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type='text'
          onChange={e => setUserID(e.target.value)}
          placeholder="User ID"
        />

        <button type="submit">Add Todo</button>
      </form>
  )
}

export default AddItem