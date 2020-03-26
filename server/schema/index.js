const { 
  GraphQLID, 
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} = require('graphql');

const items = [
  {id: 1, name: 'Apples', category: 'Produce'}
]


const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    category: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(items, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})