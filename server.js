import { GraphQLServer } from 'graphql-yoga'
import gql from 'graphql-tag';

// Optional ra ang gql, para syntax completion/hightlight sa editor.
const typeDefs = gql`
  # Ang enum kay mga pre defined values na sa graphql.
  # Mura pug enum sa mysql.
  enum Gender {
    MALE
    FEMALE
  }

  type Query {
    # Using sa enum nga gender nga MALE.
    # {
    #     getGender(gender: MALE)
    # }
    getGender(gender: Gender!): String!
  }
`
// If mana ka dri checkout didto sa enum-custom-value nga branch:
// git checkout enum-custom-value

const resolvers = {
  Query: {
    getGender: (_, { gender }) => `Gender nimo is: ${gender}`,
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))
