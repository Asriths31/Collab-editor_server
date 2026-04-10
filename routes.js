import { Router } from "express";

import dotenv from "dotenv";
import {createDoc,  addData } from "./controllers/createDoc.js";
import signIn from "./controllers/signIn.js";
import signUp from "./controllers/signUp.js";
import  { getDocs,getDocData } from "./controllers/getDocs.js";
import { getAllUsers } from "./controllers/users.js";
import { chatBot } from "./controllers/chatBot.js";

dotenv.config()

export const routes=Router()


routes.get("/docs",getDocs)
routes.get("/getDoc/:docId",getDocData)

routes.get("/getUsers",getAllUsers)


routes.post("/addData",addData)
routes.post("/signIn",signIn)

routes.post("/signUp",signUp)

routes.post("/createDoc",createDoc)

routes.post("/chatBot",chatBot)