import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import { dbValidUntil, db } from "./db/schema"
import { eq } from "drizzle-orm"


const app = express()
const port = process.env.PORT || 3001
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let max = 0;

app.get("/api/json", async (req, res) => {

    let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
    const response = await fetch(url)
    const data = await response.json()
    res.json({ data })
})




app.get("/valid", async (req, res) => {
  let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
  const response = await fetch(url)
  const data = await response.json()
  try {
    const newValidUntil = data.validUntil
    const ValidUntils = await db.select().from(dbValidUntil)
    const oldValidUntil = ValidUntils.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)

    
    const valid = {
      dbValidUntil: (oldValidUntil).ValidUntil,
      newValidUntil: newValidUntil 
    }

    
    res.send(valid)
  } catch (error) {
    console.log(error)
  }
})


app.post("/DbUpdater", async (req, res) => {
  let url = "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
  const response = await fetch(url)
  const data = await response.json()
  const newValidUntil = data.validUntil

  const valid = req.body

  try {
    if (valid.dbValidUntil == valid.newValidUntil)
      res.send("validUntil is up to date!")
    if (valid.dbValidUntil !== valid.newValidUntil)
      await db.insert(dbValidUntil).values({
  
        ValidUntil: newValidUntil
      }
    );
      res.send("validUntil has been updated!")

  } catch (error) {
    console.log(error)
  }
})


app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}/`)
})