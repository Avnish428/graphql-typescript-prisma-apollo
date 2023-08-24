export const typeDefs = `
type User {
    id:ID!
    email:String!
    firstName:String!
    lastName:String! 
    profileImage:String  
    posts: [Post]
}
type UpdateUser{
    id:ID!
    firstName:String!
    lastName:String!
}
`;