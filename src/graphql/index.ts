
const { ApolloServer } = require("@apollo/server");
import { User } from "./users";
import { Post } from "./posts"

export default async function createApolloGraphqlServer() {

    const graphQlServer = new ApolloServer({
        typeDefs: `
        ${User.typeDefs}
        type Query{
           ${User.queries}
        }
        
        type Mutation {
           ${User.Mutations}
        }
        
        ${Post.typeDefs}
        type Mutation {
            ${Post.Mutations}
         }
         type Query{
            ${Post.queries}
         }
         
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations
            }
        }
    });

    await graphQlServer.start()
    return graphQlServer;
}