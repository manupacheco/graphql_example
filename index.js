'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql')
// para poder leer el schema y poder separar
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.HOST || 3000

// definicion del esquema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => console.log(`🚀 server is listening at http://localhost:${port}/api`))
