import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import { dbValidUntil, db } from "./db/schema"
import { eq } from "drizzle-orm"
import { validList } from "./db/datamanager/dbValidList"
import { UpdateThing } from './db/datamanager/updater';
import { getnewdata } from './db/datamanager/providerImport';
import { Validator } from './db/datamanager/validator';
import { validUpdater } from './db/datamanager/validUpdater';
import { newValidChecker } from './db/datamanager/newValidChecker';


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
  res.send(data)
})

app.get("/newdata", async (req, res) => {


  const data = await validUpdater()
  res.send(data)
})

app.get("/newValidChecker", async (req, res) => {


  const data = await newValidChecker()
  res.send(data?.toString())
})

app.get("/validList", async (req, res) => {
  const data = await validList()
  res.send(data)
})

app.get("/validUpdater", async (req, res) => {
  const data = await validUpdater()
  const id = await newValidChecker()

})



app.get("/valid", async (req, res) => {


  try {
    const valid = await Validator()




    if (valid?.dbValidUntil == valid?.newValidUntil) {

      res.send("valid is up to date")
    }



    if (valid?.dbValidUntil !== valid?.newValidUntil) {
      UpdateThing()
      res.send("valid has been updated")
    }


  } catch (error) {
    console.log(error)
  }
})

/*
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
*/

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