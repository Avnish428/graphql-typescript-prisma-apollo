export const queries = `
hello:String
login(email: String!, password: String!): String
getCurrentLoggedInUser:User
getAllUsers(  
    where: UserWhereInput
    sortBy: String
    sort:String
    skip: Int
    take: Int
    select:UserSelectInput
    search:String
    ):[User]
getUserById(id:String!):User
`;