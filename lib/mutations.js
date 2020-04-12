'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

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
    } catch (error) { errorHandler(error) }
  },
  editCourse: async (root, { _id, input }) => {
    try {
      const db = await connectDB()
      await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
      const course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
      return course
    } catch (error) { errorHandler(error) }
  },
  createPerson: async (root, { input }) => {
    try {
      const db = await connectDB()
      const student = await db.collection('students').insertOne(input)
      return student.ops[0]
    } catch (error) { errorHandler(error) }
  },
  editPerson: async (root, { _id, input }) => {
    try {
      const db = await connectDB()
      const course = await db.collection('students').updateOne({ _id: ObjectID(_id) }, { $set: input })
      return course.ops[0]
    } catch (error) { errorHandler(error) }
  },
  addPeople: async (root, { courseID, personID }) => {
    try {
      const db = await connectDB()
      const course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      const student = await db.collection('students').findOne({ _id: ObjectID(personID) })
      if (!course || !student) throw new Error('La persona o el curso no existe')
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } })
      console.log('course', course)
      return course
    } catch (error) { errorHandler(error) }
  }
}
