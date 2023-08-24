export const Mutations = `
createUser(firstName: String!, lastName: String, email: String!,password:String!): String
updateUser(id:String!,firstName: String, lastName: String):UpdateUser
deleteUser(id:String):User
`;