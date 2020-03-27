'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

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
    getCourse: async ({ id }) => {
      let db
      let course = {}
      // console.log('args', root)
      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
        // console.log('course', course)
        return course
      } catch (error) { console.error(error) }
    }
  }
}
