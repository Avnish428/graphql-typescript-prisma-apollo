export const queries = `
hello:String
login(email: String!, password: String!): String
getCurrentLoggedInUser:User
getAllUsers:[User]
getUserById(id:String!):User
`;