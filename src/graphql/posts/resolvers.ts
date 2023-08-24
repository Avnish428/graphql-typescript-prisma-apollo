import { ICreatePost, IUpdatePost, PostService } from "../../services/post"

const queries = {
    hi: async () => {
        return "hello from apollo server and avnish from post"
    },
    getAllPosts: async (): Promise<any> => {
        const res = await PostService.getAllPosts();
        return res;
    },
    getPostById: async (_: any, payload: { id: string }) => {
        const { id } = payload
        const res = await PostService.getPostById(id);
        return res;
    }
};
const mutations = {
    createPost: async (_: any, payload: ICreatePost) => {
        const res = await PostService.createPost(payload)
        return res;
    },
    updatePost: async (_: any, payload: IUpdatePost) => {
        const res = await PostService.updatePost(payload);
        return res;
    },
    deletePost: async (_: any, payload: { id: string }) => {
        const res = await PostService.deletePost(payload)
        return res
    },
};


export const resolvers = {
    queries, mutations
}