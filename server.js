import { GraphQLServer } from 'graphql-yoga'
import gql from 'graphql-tag';

// Optional ra ang gql, para syntax completion/hightlight sa editor.
const typeDefs = gql`
  type Query {
      _empty: String!
  }

  # Custom Type
  type User {
    firstName: String!
    lastName: String!
    # Wlay exclamation mark, meaning pwedi siya ma null
    age: Int
  }

  # Gamit ug input in-case nga daghan ang kinahanglan nga arguments sa kana nga Query, or Mutation.
  input CreateUserInput {
      firstName: String!
      lastName: String!
      age: Int!
  }

  type Mutation {
    # instead nga ang firstname, lastname ug age kay separate nga arguments.
    # Ge sagol na sa usa ka argument silang tulo which is ang input.
    #
    # {
    #     createUser(input: { firstName: "John", lastName: "Doe", age: 35 }) {
    #         firstName
    #         lastName
    #         age
    #     }
    # }
    createUser(input: CreateUserInput!): User!
  }
`
// If mana ka dri checkout didto sa enum nga branch:
// git checkout enum

const resolvers = {
  Mutation: {
    createUser: (_, { input }) => {
        // ... e store ang user sa datastore.
        return { firstName: input.firstName, lastName: input.lastName, age: input.age };
    },
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))
