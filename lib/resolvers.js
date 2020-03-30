'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const mutations = require('./mutations')
const types = require('./types')

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
    },
    getStudents: async () => {
      let db
      let students = []
      try {
        db = await connectDB()
        students = await db.collection('students').find().toArray()
        return students
      } catch (error) { console.error(error) }
    },
    getStudent: async (root, { id }) => {
      let db
      let student = {}
      try {
        db = await connectDB()
        student = await db.collection('students').findOne({ _id: ObjectID(id) })
        return student
      } catch (error) { console.error(error) }
    }
  },
  Mutation: mutations,
  ...types
}
