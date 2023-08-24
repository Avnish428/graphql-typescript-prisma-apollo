import { prismaClient } from "../lib/db"
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET = "JWT_SECRET";

export interface ICreateUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface ILogin {
    email: string,
    password: string
}

export interface IUpdateUser {
    id: string,
    firstName: string,
    lastName: string,
}
export class UserService {


    private static hassedPassword(salt: string, password: string) {
        const hasshedPassword = createHmac("sha256", salt).update(password).digest('hex');
        return hasshedPassword;
    }

    private static singJwtToken(payload: { id: string, email: string }) {
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }


    public static verifyToken(token: string) {
        const res = JWT.verify(token, JWT_SECRET)
        return res;
    }

    private static async getUserByEmail(email: string) {
        const res = await prismaClient.user.findUnique({ where: { email } });
        return res;
    }

    public static async getUserById(id: string) {
        const res = await prismaClient.user.findUnique({
            where: { id },
            include: {
                posts: true,
            },
        });
        return res;
    }

    public static createUser(payload: ICreateUser) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hasshedPassword = UserService.hassedPassword(salt, password);
        return prismaClient.user.create({
            data: {
                firstName, lastName, email, password: hasshedPassword, salt: salt
            }
        })

    }

    public static async getAllUsers(payload: any) {
        const { search, filters, skip, sortBy, sort, fields, take, where } = payload;
        console.log(search)
        try {
            var pair = {};
            //@ts-ignore
            pair[sortBy] = sort;
            let where = {
                OR: [
                    {
                        email: {
                            startsWith: `%${search ? search : "%"}%`,
                            mode: "insensitive", // Default value: default
                        }
                    },
                ],
            }
            let query = {
                where: where,
                skip: skip ? (skip - 1) * take : undefined,
                take: take ? parseInt(take) : undefined,

                orderBy: [pair],
                select: fields ? JSON.parse(fields) : undefined,
            };

            if (filters) {
                const parsedFilters = JSON.parse(filters);
                query.where = { ...query.where, ...parsedFilters };
            }
            console.log(query, "query")
            const res = await prismaClient.user.findMany(
                //@ts-ignore
                query,
                // select: {
                //     email: true,
                //     id: true,
                //     profileImage: true,
                //     lastName: true,
                //     firstName: true,
                //     posts: {
                //         select: {
                //             title: true,
                //             body: true,
                //             id: true,
                //             userId: true
                //         },
                //     },
                // },
            );
            return res
        } catch (error) {
            console.log(error, "error")
            return error
        }

    }

    public static async login(payload: ILogin) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error("user not found with this email")
        }
        const userSalt = user.salt;

        const userHasshedPassword = UserService.hassedPassword(userSalt, password);
        if (userHasshedPassword != user.password) {
            throw new Error("incorrect password")
        }
        const token = UserService.singJwtToken({ id: user.id, email: user.email });
        return token;

    }

    public static async updateUser(payload: IUpdateUser) {
        const { firstName, lastName, id } = payload;
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
            },
        });
        return updatedUser;
    }

    public static async deleteUser(payload: { id: string }) {
        const { id } = payload;
        const user = await UserService.getUserById(id);
        if (!user) {
            throw new Error("no user found to delete with the given id");
        }
        const deletedUser = await prismaClient.user.delete({
            where: { id }
        })
        return deletedUser;
    }


}