[![CircleCI](https://circleci.com/gh/CaptorAB/graphql-objectid-scalar/tree/master.svg?style=svg)](https://circleci.com/gh/CaptorAB/graphql-objectid-scalar/tree/master)
[![npm version](https://badge.fury.io/js/graphql-objectid-scalar.svg)](https://badge.fury.io/js/graphql-objectid-scalar)
[![install size](https://packagephobia.now.sh/badge?p=graphql-objectid-scalar)](https://packagephobia.now.sh/result?p=graphql-objectid-scalar)

# graphql-objectid-scalar

## Usage

Install it with 
```
npm install graphql-objectid-scalar
```


This package exports a GraphQLObjectId value scalar GraphQL.js type:

```js
import { GraphQLObjectId } from "graphql-objectid-scalar";
```


### SDL with [GraphQL-tools](https://github.com/apollographql/graphql-tools)

When using the SDL with GraphQL-tools, define `GraphQLObjectId` as the resolver for the appropriate scalar type in your schema:

```js
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLObjectId } from "graphql-objectid-scalar";

const typeDefs = `
scalar GraphQLObjectId

type MyType {
  _id: GraphQLObjectId
}

# ...
`;

const resolvers = {
  GraphQLObjectId: GraphQLObjectId,
};

export default makeExecutableSchema({ typeDefs, resolvers });
```
