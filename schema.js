// import {
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLString
// } from 'graphql'

var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLString = require('graphql').GraphQLString
var fetch = require('node-fetch');

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

function getPostById(id) {
  return fetch(`${BASE_URL}/posts/${id}`) //API call for posts/1 say.
    .then(res => res.json())
}

function getAllPosts() {
  return fetch(`${BASE_URL}/posts`) //API call for posts/1 say.
    .then(res => res.json())
}

function getUser(id) {
  return fetch(`${BASE_URL}/users/${id}`) //API call for posts/1 say.
    .then(res => res.json())
}

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: '...',
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    id: { type: GraphQLString },
    user: {
      type: UserType, //need to declare the usertype
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (post) => getUser(post.userId)
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    post: PostType, //needs to be declared
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, args) => getPostById(args.id),

    // posts: {
    //   type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))), //array of posts
    //   args: {},
    //   resolve: (root, args) =>
    //     fetch(`${BASE_URL}/posts`) //API call for all posts.
    //       .then(res => res.json())
    // },
  })
});

module.exports = new GraphQLSchema({ //essentially our schema string from previous example
  query: QueryType,
});

