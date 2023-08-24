export const typeDefs = `
type Post {
    id:ID!
    title:String!
    body:String!
    userId:String!
}

input PostUpdateManyInput {
    title: String,
    body: String,
    titleId:String    
}

`;