'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

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
  },
  editCourse: async (root, { _id, input }) => {
    try {
      const db = await connectDB()
      await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
      const student = await db.collection('courses').findOne({ _id: ObjectID(_id) })
      return student
    } catch (error) { console.error(error) }
  },
  createStudent: async (root, { input }) => {
    try {
      const db = await connectDB()
      const student = await db.collection('students').insertOne(input)
      return student.ops[0]
    } catch (error) { console.error(error) }
  },
  editStudent: async (root, { _id, input }) => {
    try {
      const db = await connectDB()
      const course = await db.collection('students').updateOne({ _id: ObjectID(_id) }, { $set: input })
      return course.ops[0]
    } catch (error) { console.error(error) }
  }
}
