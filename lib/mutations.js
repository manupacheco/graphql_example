'use strict'

const connectDB = require('./db')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: 'default',
      topic: ''
    }
    try {
      const db = await connectDB()
      const course = await db.collection('courses').insertOne({ ...defaults, ...input })
      return course.ops[0]
    } catch (error) { console.error(error) }
  }
}
