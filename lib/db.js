'use strict'

const { MongoClient } = require('mongodb')

const mongoUrl = process.env.DB_HOST
let connection

async function connectDB () {
  if (connection) return connection
  let client

  try {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    connection = client.db(process.env.DB_NAME)
  } catch (error) {
    console.log('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
