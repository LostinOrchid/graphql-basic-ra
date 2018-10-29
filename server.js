import { GraphQLServer } from 'graphql-yoga'
import gql from 'graphql-tag';

// Optional ra ang gql, para syntax completion/hightlight sa editor.
const typeDefs = gql`
  type Query {
      _empty: String
  }
  # Mutations kay kung naa kay data sa server nga ganahan nimo ma add/change like,
  # create/update ug user.
  type Mutation {
    # Mutation nga walay arguments
    # adto sa playground then e paste ni
    # {
    #     mutation {
    #         getRandomInt
    #     }
    # }
    getRandomInt: Int!
  }
`
// If mana ka dri checkout didto sa mutation-with-args nga branch:
// git checkout mutation-with-args

const resolvers = {
  Mutation: {
    getRandomInt:(_, args) => parseInt(Math.random(), 10),
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))
