import express, {Request, Response} from "express";
import cors from "cors";
import loginGoolgeRoutes from "./routes/loginGoolgeRoutes"; 
import createUserRoutes from "./routes/createUserRotes"
import searchUserRoutes from "./routes/searchUserRotes"


const app = express();
const port = 4000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use(express.json());
app.use(cors(corsOptions))

//Rota para login com o google
app.use("/login", loginGoolgeRoutes)

//Rota pra criar usuario
app.use("/criar-user", createUserRoutes)

//Rota para buscar o nome do user
app.use("/buscar-user", searchUserRoutes)

app.get("/", (req:Request, res:Response) => {
    res.send("API funcionando (Rodando até o momento ok?)")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})