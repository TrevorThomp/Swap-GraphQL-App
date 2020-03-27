import React from 'react';
import { gql } from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';

const GET_ITEMS = gql`
  {
    items{
      name
      price
      description
      user{
        username
      }
    }
  }
`;

function Items(){
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const listItems = data.items.map((item, i) => (
    <tr id="item-row" key={i}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
      <td>{item.user[0].username}</td>
      <td></td>
    </tr>
  ))
  return(
    <div>
                <h2>Items for Sale</h2>
      <table>
        <tbody>
          <tr id="item-headings">
            <td>Item</td>
            <td>Price</td>
            <td>Description</td>
            <td>Posted By:</td>
          </tr>
          {listItems}
        </tbody>
      </table>
    </div>
  )
}

export default Items;