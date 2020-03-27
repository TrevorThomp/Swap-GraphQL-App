import React from 'react';
import { gql } from 'apollo-boost'
import {graphql} from '@apollo/react-hooks';

const getItemsQuery = gql`
  {
    items {
      name
      id
      user{
        name
      }
    }
  }
`

function Items(){
  return(
    <div>
      <ul id='item-list'>
        <li>Item</li>
      </ul>
    </div>
  )
}

export default Items;