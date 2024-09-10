import dotenv from "dotenv"
dotenv.config({})
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";



const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/json", async (req, res) => {

    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    res.json({ data })
})

app.get("/api/cosmos", async (req, res) => {

    const cosmos = await prisma.validUntil.findMany()
    res.json({ cosmos });
});

app.listen(5000, ()=> {
    console.log("server running on localhost:5000")
});
