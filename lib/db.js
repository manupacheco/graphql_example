'use strict'

const { MongoClient } = require('mongodb')

const mongoUrl = 'mongodb+srv://mpacheco:XTxePa1tdcC7ctLs@test-atak0.mongodb.net/test?retryWrites=true&w=majority'
let connection

async function connectDB () {
  if (connection) return connection
  let client

  try {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    connection = client.db('graphql')
  } catch (error) {
    console.log('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
