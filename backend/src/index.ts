import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import { dbValidUntil, reservations, db } from "./db/schema"
import { eq } from "drizzle-orm"
import { validList } from "./db/datamanager/dbValidList"
import { UpdateThing } from './db/datamanager/updater';
import { getnewdata } from './db/datamanager/providerImport';
import { Validator } from './db/datamanager/validator';
import { validUpdater } from './db/datamanager/validUpdater';
import { newValidChecker } from './db/datamanager/newValidChecker';
import { oldValidChecker } from './db/datamanager/oldValidChecker';
import { dbChecker } from './db/datamanager/dbChecker';
import { getValid } from './db/datamanager/getValid';
import { dbProvUpdater } from './db/datamanager/dbProvUpdater';
import { testing } from './db/datamanager/testing';
import { getValidList } from './db/datamanager/getValidList';
import { dbReserveCheck } from './db/datamanager/dbReserveCheck';
import { dbReserve } from './db/datamanager/dbReserve';


const app = express()
const port = process.env.PORT || 3001
app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}));
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
  const vallist = await getValidList()
  let obj = {
    validListes:  vallist ,
    allprovs:  data 
  }
  res.send(obj)
})
app.get("/getRes/:firstName/:lastName", async (req, res) => {
  const {firstName, lastName} = req.params
  const result = await db.select().from(reservations).where(eq(reservations.firstName, firstName)&&eq(reservations.lastName, lastName))
  res.send(result)
})
app.get("/setRes/:providerID/:firstName/:lastName/:validUntilID", async (req, res) => {
  
  const {providerID, firstName, lastName, validUntilID} = req.params
  let fields =
  {
    providerID: parseInt(providerID),
    firstName: firstName,
    lastName: lastName,
    validUntilID: parseInt(validUntilID)
  }
  
  //const result = await db.insert(reservations).values(fields).$returningId()
  let result = await dbReserve(fields)
  res.send(result)
  
})

app.get("/testing/:providerID/:firstName/:lastName/:validUntilID", async (req, res) => {

  const {providerID, firstName, lastName, validUntilID} = req.params
  let fields =
  {
    providerID: parseInt(providerID),
    firstName: firstName,
    lastName: lastName,
    validUntilID: parseInt(validUntilID)
  }
  const data = await dbReserve(fields)
  res.send(data)
})
app.get("/validator", async (req, res) => {


  const data = await Validator()
  res.send(data)
})
app.get("/dbProvUpdater", async (req, res) => {


  const data = await dbProvUpdater()
  res.send(data)
})
app.get("/getValid", async (req, res) => {


  const data = await getValid(6)
  res.send(data)
})

app.get("/newValidChecker", async (req, res) => {


  const data = await newValidChecker()
  res.send(data?.toString())
})
app.get("/dbChecker", async (req, res) => {


  const data = await dbChecker()
  res.send(data?.toString())
})

app.get("/oldValidChecker", async (req, res) => {


  const data = await oldValidChecker()
  res.send(data?.toString())
})

app.get("/validList", async (req, res) => {
  const data = await validList()
  res.send(data)
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