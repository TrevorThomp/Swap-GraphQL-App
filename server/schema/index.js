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
const Job = require('../model/job');
const bcrypt = require('bcryptjs');

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: {type: GraphQLID},  
    name: {type: GraphQLString},
    category: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args){
        return User.findById(parent.userID)
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
      type: JobType,
      resolve(parent,args){
        return Job.find({userID: parent.id})
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
        return Job.findById(args.id)
      }
    },
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent,args){
        return Job.find({})
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
    addJob: {
      type: JobType,
      args: {
        name: {type: GraphQLString},
        category: {type: GraphQLString},
        userID: {type: GraphQLID}
      },
      resolve(parent,args){
        let job = new Job({
          name: args.name,
          category: args.category,
          userID: args.userID
        })
        return job.save();
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
          password: hashed
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