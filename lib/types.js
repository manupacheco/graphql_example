'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  Course: {
    people: async ({ people }) => {
      try {
        const db = await connectDB()
        const ids = people ? people.map(id => ObjectID(id)) : []
        const peopleData = ids.length > 0 ? await db.collection('students').find({ _id: { $in: ids } }).toArray() : []
        return peopleData
      } catch (error) { console.error(error) }
    }
  }
}
