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

## Setting up route with arguments

1. In `schema/typeDefs.js`, add a `user` property to `Query` type

```
  type Query {
    users: [User!]
    user(id: ID!): User
    // the id passed must be of type ID
  }
```

2. In `schema/resolvers.js`, add a `user()` method to `Query` object.
3. Use `args` -- the second parameter in a GraphQL Query method
4. In this case we are finding the id which will be passed by the front end when querying this route

```
user(parent, args) {
  const id = args.id
}
```

5. Using `lodash` (import * as _ from 'lodash' / const _ = require('lodash')) to traverse the local data, write a query to find a `User` from `UserList` who's ID matches the one found on `args.id`

```
user(parent, args) {
  const id = args.id
  const user = _.find(UserList, {
    id: Number(id),
  })
}
```
6. `return` the found user

```
user(parent, args) {
  const id = args.id
  const user = _.find(UserList, {
    id: Number(id),
  })
  return user
},
```

---

## Removing existing node process

1. `lsof -i tcp:{portNumber}`
2. Look for process that has command = node and copy PID
3. `kill -9 {PID}`

## Local Data

```
const UserList = [
  {
    id: 1,
    name: "Mark",
    username: `Mark123`,
    age: 18,
    nationality: "US",
    friends: [
      {
        id: 2,
        name: "Joan",
        username: `Joan123`,
        age: 38,
        nationality: "GERMANY",
      },
      {
        id: 3,
        name: "John",
        username: `John123`,
        age: 44,
        nationality: "SPAIN",
      },
    ],
  },
  {
    id: 2,
    name: "Joan",
    username: `Joan123`,
    age: 38,
    nationality: "GERMANY",
  },
  {
    id: 3,
    name: "John",
    username: `John123`,
    age: 44,
    nationality: "SPAIN",
  },
]

const MovieList = [
  {
    id:  1,
    name: 'Interstellar',
    year: '2018',
    inTheaters: false
  },
  {
    id:  2,
    name: 'Avengers',
    year: '2016',
    inTheaters: false
  },
  {
    id:  3,
    name: 'Shrek',
    year: '2007',
    inTheaters: true
  },
]

module.exports = {
  UserList,
  MovieList,
}

```

## Operation Queries

```
# query GetUsers {
#   users {
#     id
#     name
#     username
#     age
#     nationality
#     friends {
#       name
#       age
#     }
#   }
# }›

# query GetUser($userId: ID!) {
#   user(id: $userId) {
#     name
#     age 
#     nationality
#   }
# }

# query GetMovies {
#   movies {
#     id
#     name
#     year
#     inTheaters
#   }
# }

query GetMovie($name: String!) {
  movie(name: $name) {
    id
    name
    year
    inTheaters
  }
}
```