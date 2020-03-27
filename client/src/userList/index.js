import React from 'react';
import { gql } from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks';

const GET_USERS = gql`
  {
    users{
      username
    }
  }
`

function Items(){
  const { loading, error, data } = useQuery(GET_USERS);
  

  console.log(data)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return(
    <div>
      <ul id='item-list'>
        <li>User Names</li>
        {data.users.map(user => (
          <>
          <li>{user.username}</li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default Items;