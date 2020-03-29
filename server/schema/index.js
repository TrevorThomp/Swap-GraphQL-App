const { 
  GraphQLID, 
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQL
} = require('graphql');
const _ = require('lodash')
const User = require('../model/user');
const Item = require('../model/item');
const bcrypt = require('bcryptjs');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: {type: GraphQLID},  
    name: {type: GraphQLString},
    price: {type: GraphQLInt},
    description: {type: GraphQLString},
    category: {type: GraphQLString},
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find({_id: parent.userID})
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    jobs: {
      type: new GraphQLList(ItemType),
      resolve(parent,args){
        return Item.find({userID: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args){
        return Item.findById(args.id)
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent,args){
        return Item.find({})
      }
    },
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parent,args){
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return User.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLInt},
        category: {type: GraphQLString},
        userID: {type: GraphQLID}
      },
      resolve(parent,args){
        let item = new Item({
          name: args.name,
          description: args.description,
          price: args.price,
          category: args.category,
          userID: args.userID
        })
        return item.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent,args){
        const hashed = await bcrypt.hash(args.password, 10)
        let user = new User({
          username: args.username,
          email: args.email,
          password: args.password
        })
       return user.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})