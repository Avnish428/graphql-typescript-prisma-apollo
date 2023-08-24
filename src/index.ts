const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
import createApolloGraphqlServer from "./graphql/index"
import { UserService } from "./services/user";
const port = 8000;

async function Init() {
    const app = express();

    app.use(express.json())
    app.use(cors());
    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), {
        //@ts-ignore
        context:  ({ req }) => {
            const token = req.headers["token"];
            try {
                const res =  UserService.verifyToken(token)
                return res;
            } catch (error) {
                return {};
            }
        }
    }))

    app.listen(port, () => {

        console.log(`Listening on port ${port}`)
    })

}

Init()

