import { GraphQLServer } from 'graphql-yoga'
import gql from 'graphql-tag';

// Optional ra ang gql, para syntax completion/hightlight sa editor.
const typeDefs = gql`
  # Custom Type
  type User {
    firstName: String!
    lastName: String!
    # Wlay exclamation mark, meaning pwedi siya ma null
    age: Int
  }

  type Query {
    # Required ang firstName, ug lastName except sa age.
    # {
    #     yourFullnameData(firstName: "John", lastName: "Doe") {
    #         firstName
    #         lastName
    #         age
    #     }
    # }
    yourFullnameData(firstName: String!, lastName: String!, age: Int): User!
  }

`
// If mana ka dri checkout didto sa input-type nga branch:
// git checkout input-type

const resolvers = {
  Query: {
    yourFullnameData: (_, { firstName, lastName, age }) => ({ firstName, lastName, age }),
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))
