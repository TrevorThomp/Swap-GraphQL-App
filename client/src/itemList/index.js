import React from 'react';
import { gql } from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';

const GET_ITEMS = gql`
  {
    items{
      name
      price
      user{
        username
      }
    }
  }
`

function Items(){
  const { loading, error, data } = useQuery(GET_ITEMS);
  

  console.log(data)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const listItems = data.items.map(item => (
    <tr id="item-row" key={item._id}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.description}</td>
      <td>{item.user[0].username}</td>
      <td></td>
    </tr>
  ))
  return(
    <div>
      <table>
        <tbody>
          <h2>Items for Sale</h2>
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