export const Mutations = `
createPost(title:String!,body:String!,userId:String!):Post
updatePost(id:String!,title: String, body: String):Post
deletePost(id:String!):Post
updateManyPost(payload: PostUpdateManyInput ):String
`;