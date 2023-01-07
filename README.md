# GraphQL Practice

## Setting up GraphQL server with local data

1. Set up NPM -- `npm init`
2. Install Nodemon and some GraphQL server
   1. `npm i nodemon apollo-server`
   2. or
   3. `npm i nodemon express-graphql`
3. Within server entry point (server.js for example) -- import/require:
   1. `ApolloServer`
   2. `typeDefs` (will be defined and imported from schema/typeDefs)
   3. `resolvers` (will be defined and imported from schema/resolvers)
4. Within server entry point -- create an instance of an ApolloServer:
   ```
   const server = new ApolloServer({ typeDefs, resolvers })
   ```
5. Within server entry point -- log server url:
   ```
   server.listen().then({url}) => console.log(`SERVER RUNNING AT: ${url}`)
   ```

## Setting up Graph QL typeDefs

1. Create `schema/typeDefs.js`
2. Import/require `gql` from `apollo-server` to allow for parsing of `typeDef` string.
3. Define typeDef:

```
const typeDefs = gql`
  // structure or interface of graphql object
  type User {
    id: ID
    // ID is a type in gql
    name: String!
    // ! makes it required
    username: String!
    age: Int!
    nationality: String!
  }

  // almost like the routes of a REST api
  type Query {
    users: [User!]
    // when querying users if it returns an array, each element must be of type User
  }
`
```

3. Export typeDef:

```
module.exports = {
  typeDefs
}
```

## Setting up Graph QL resolvers

1. Create `schema/resolvers.js`
2. Import/require local data:

```
const { UserList } = require("../data")
```

3. Create resolver object:

```
const resolvers = {
  // Create Query object
  Query: {
    // Create method on Query Object -- define what it will do/return when called
    users() {
      return UserList
    },
  },
}
```

4. Export resolver:

```
module.exports = { resolvers }
```

## Querying in GraphQL

1. Start server -- `nodemon server.js` in console
   1. or add `"start": 'nodemon server.js'` to npm scripts and run `npm start`
2. Access URL endpoint provided by `server.listen()` on browser.
3. In `Operations` section of apollo studio write query: 
```
// Name the query
query GetAllUsers {
  // users is a resolver route
  users {
    // we want to return the following fields:
    id
    name
    username
    age
    nationality
  }
} 

/* return
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Mark",
        "username": "Mark123",
        "age": 18,
        "nationality": "US"
      },
      {
        "id": "2",
        "name": "Joan",
        "username": "Joan123",
        "age": 38,
        "nationality": "US"
      },
      {
        "id": "3",
        "name": "John",
        "username": "John123",
        "age": 44,
        "nationality": "US"
      }
    ]
  }
}
*/
```

---

## Local Data

```
const UserList = [
  {
    id: 1,
    name: "Mark",
    username: `Mark123`,
    age: 18,
    nationality: "US",
  },
  {
    id: 2,
    name: "Joan",
    username: `Joan123`,
    age: 38,
    nationality: "US",
  },
  {
    id: 3,
    name: "John",
    username: `John123`,
    age: 44,
    nationality: "US",
  },
]

module.exports = {
  UserList
}
```
