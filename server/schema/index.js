const { 
  GraphQLID, 
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} = require('graphql');
const _ = require('lodash')
const User = require('../model/user');
const Job = require('../model/job');

const jobs = [
  {id: 1, username: 'Software Engineer', category: 'Tech', userID: 1},
  {id: 2, username: 'Landscaper', category: 'Landscaping', userID: 2}
]

const users = [
  {id: 1, name: 'Trevor Thompson', email: 'Trevor24x@gmail.com'},
  {id: 2, name: 'Chuck Smith', email: 'Trevor24x@gmail.com'}
]


const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: {type: GraphQLID},  
    name: {type: GraphQLString},
    category: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args){
        return _.find(users, {id: parent.userID})
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    jobs: {
      type: JobType,
      resolve(parent,args){
        return _.find(jobs, {userID: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    job: {
      type: JobType,
      args: {id: {type: GraphQLInt}},
      resolve(parent, args){
        return _.find(jobs, {id: args.id})
      }
    },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent,args){
        return jobs
      }
    },
    user: {
      type: UserType,
      args: {id: {type:GraphQLInt}},
      resolve(parent,args){
        return _.find(users, {id: args.id})
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return users
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addJob: {
      type: JobType,
      args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        category: {type: GraphQLString}
      },
      resolve(parent,args){
        items.push({id: args.id, name: args.name, category: args.category})
        return _.find(items, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})