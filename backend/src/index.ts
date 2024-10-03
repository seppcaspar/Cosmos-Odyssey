import 'dotenv/config';
import express from 'express'
import cors from 'cors';
import { reservations, db } from "./db/schema"
import { eq } from "drizzle-orm"
import { validUpdater } from './db/datamanager/validUpdater';
import { getValidList } from './db/datamanager/getValidList';
import { dbReserve } from './db/datamanager/dbReserve';

const app = express()
const port = process.env.PORT || 3001
app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//makes a json that has last 15 pricelists and all providers within the pricelists
app.get("/newdata", async (req, res) => {
  const data = await validUpdater()
  const vallist = await getValidList()
  let obj = {
    validListes:  vallist ,
    allprovs:  data 
  }
  res.send(obj)
})


//gets customer reservations by name and sends providerIDs that are reserved
app.get("/getRes/:firstName/:lastName", async (req, res) => {
  const {firstName, lastName} = req.params
  const result = await db.select().from(reservations).where(eq(reservations.firstName, firstName)&&eq(reservations.lastName, lastName))
  res.send(result)
})


//adds a reservation to the customers name and sends back reserved providerIDs
app.get("/setRes/:providerID/:firstName/:lastName/:validUntilID", async (req, res) => {
  const {providerID, firstName, lastName, validUntilID} = req.params

  let fields =
  {
    providerID: parseInt(providerID),
    firstName: firstName,
    lastName: lastName,
    validUntilID: parseInt(validUntilID)
  }
  
  let result = await dbReserve(fields)
  res.send(result)
})

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}/`)
})