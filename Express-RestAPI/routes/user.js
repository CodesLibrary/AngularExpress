// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12255933',
  password: 'mwsxum5meJ',
  database: 'sql12255933'
})

function getConnection() {
  return pool
}

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM Persons"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })

  router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM Persons WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched users successfully")

        const users = rows.map((row) => {
        return {firstName: row.LastName, lastName: row.FirstName}
        })
        res.json(users)
    })
})


router.post('/user_create', (req, res) => {
    const lastName = req.body.inputField_lastName
    const firstName = req.body.inputField_firstName
    const address = req.body.inputField_address
    const city = req.body.inputField_city

    const queryString = "INSERT INTO Persons (LastName, FirstName,Address,City) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [lastName,firstName,address,city], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new user with id: ", results.insertId);
      res.end()
    })
  })
  





router.delete('/user/:id', (req, res) => {
  const queryString = "DELETE FROM Persons WHERE id=?"
  getConnection().query(queryString,[req.params.id], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
})



router.put('/user/:id', (req, res) => {

  const lastName = req.body.inputField_lastName
  const firstName = req.body.inputField_firstName
  const address = req.body.inputField_address
  const city = req.body.inputField_city
  
  const queryString = "UPDATE Persons SET LastName =?, FirstName=?, Address=?, City=? WHERE id=?" 
  getConnection().query(queryString,[lastName,firstName,address,city,  req.params.id], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertId);
    res.end()
  })
})


module.exports = router