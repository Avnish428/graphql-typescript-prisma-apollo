import { prismaClient } from "../lib/db"

export interface ICreatePost {
    title: string,
    body: string,
    userId: string
}

export interface IUpdatePost {
    title: string,
    body: string,
    id: string
}


export class PostService {
    public static createPost(payload: ICreatePost) {
        const { title, body, userId } = payload;
        return prismaClient.post.create({
            data: {
                title, body, userId
            }
        })
    }
    public static async getAllPosts() {
        const res = await prismaClient.post.findMany();
        return res;
    }

    public static async getPostById(id: string) {
        const res = await prismaClient.post.findUnique({ where: { id } });
        return res;
    }

    public static async updatePost(payload: IUpdatePost) {
        const { title, body, id } = payload;
        const updatedPost = await prismaClient.post.update({
            where: { id },
            data: {
                //@ts-ignore
                title, body,
            },
        });
        return updatedPost;
    }

    public static async deletePost(payload: { id: string }) {
        const { id } = payload;
        const post = await PostService.getPostById(id);
        if (!post) {
            throw new Error("no post found to delete with the given id");
        }
        const deletedPost = await prismaClient.post.delete({
            where: { id },
        });
        console.log(deletedPost, "deletedPost");
        return deletedPost;
    }
}