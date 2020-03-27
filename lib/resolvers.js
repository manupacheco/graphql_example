'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const mutations = require('./mutations')

module.exports = {
  Query: {
    getCourses: async () => {
      let db
      let courses = []
      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
        return courses
      } catch (error) { console.error(error) }
    },
    getCourse: async (root, { id }) => {
      let db
      let course = {}
      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
        return course
      } catch (error) { console.error(error) }
    }
  },
  Mutation: mutations
}
