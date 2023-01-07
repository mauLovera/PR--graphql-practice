const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    id: ID
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
  }
  
  type Query {
    users: [User!]
  }

  enum Nationality {
    US
    GERMANY
    SPAIN
  }
`

module.exports = {
  typeDefs
}
