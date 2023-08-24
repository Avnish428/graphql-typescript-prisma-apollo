import { ICreateUser, UserService, ILogin, IUpdateUser } from "../../services/user";

const queries = {
    hello: async () => {
        return "hello from apollo server and avnish"
    },
    login: async (_: any, payload: ILogin) => {
        const { email, password } = payload;
        const res = await UserService.login({ email, password })
        return res;
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any,) => {
        if (context && context.id) {
            const userId = context.id;
            const res = await UserService.getUserById(userId)
            return res;
        }
        throw new Error("access denied")
    },
    getAllUsers: async (_: any, payload: any): Promise<any> => {
        console.log(payload, "getlalusers payload");
        const res = await UserService.getAllUsers(payload);
        return res;
    },
    getUserById: async (_: any, payload: { id: string }) => {
        const { id } = payload
        const res = await UserService.getUserById(id);
        return res;
    },
};
const mutations = {
    createUser: async (_: any, payload: ICreateUser) => {
        const res = await UserService.createUser(payload)
        return res.id;
    },
    updateUser: async (_: any, payload: IUpdateUser) => {
        const res = await UserService.updateUser(payload);
        return res;
    },
    deleteUser: async (_: any, payload: { id: string }) => {
        const res = await UserService.deleteUser(payload);
        return res;
    }

};


export const resolvers = {
    queries, mutations
}