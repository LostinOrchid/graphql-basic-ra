import { GraphQLServer } from 'graphql-yoga'
import gql from 'graphql-tag';

// Optional ra ang gql, para syntax completion/hightlight sa editor.
const typeDefs = gql`
  # Ang interface is contrata. ang mo implement ani is kailangan sundon niya ang fields.
  interface Movie {
    title: String!
    length: Int!
    releasedDate: String!
  }

  type TeleSerye implements Movie {
    # Dapat naa ni silang mga fields kay nag implement man sa ka sa movie nga interface.
    title: String!
    length: Int!
    releasedDate: String!
    # Specific fields sa kani CinemaMovie nga type.
    episodeTitle: String!
    episode: Int!
  }

  type CinemaMovie implements Movie {
    # Dapat naa ni silang mga fields kay nag implement man sa ka sa movie nga interface.
    title: String!
    length: Int!
    releasedDate: String!
    # Specific fields sa kani CinemaMovie nga type.
    # ....
  }

  type Query {
    # {
    #     getCinemaMovie {
    #         title
    #         releasedDate
    #         length
    #     }
    # }
    getCinemaMovie: CinemaMovie!
    # {
    #     getTeleSerye {
    #         title
    #         releasedDate
    #         length
    #         episodeTitle
    #         episode
    #     }
    # }
    getTeleSerye: TeleSerye!
  }
`

const resolvers = {
  Query: {
    getCinemaMovie: () => ({ length: 202020, releasedDate: '2018-12-25', title: 'Star wars: Idunno what episode' }),
    getTeleSerye: () => ({ length: 50421, releasedDate: '2016-08-26', title: 'Bubblegang', episodeTitle: 'Shoot mo yan', episode: 23 }),
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000'))
