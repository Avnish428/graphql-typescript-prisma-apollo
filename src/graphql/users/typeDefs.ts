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

input UserWhereInput {
    id:ID
    email:String
    firstName:String
    lastName:String 
    profileImage:String
}

input UserOrderByinput{
    id:ID
    email:String
    firstName:String
    lastName:String 
    profileImage:String
}

input UserSelectInput {
    id:ID
    email:String
    firstName:String
    lastName:String 
    profileImage:String
    title: String,
    body: String,
    userId: String
}
`;