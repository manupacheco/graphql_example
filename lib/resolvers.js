'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const mutations = require('./mutations')
const types = require('./types')
const errorHandler = require('./errorHandler')

module.exports = {
  Query: {
    getCourses: async () => {
      let db
      let courses = []
      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
        return courses
      } catch (error) { errorHandler(error) }
    },
    getCourse: async (root, { id }) => {
      let db
      let course = {}
      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
        return course
      } catch (error) { errorHandler(error) }
    },
    getPeople: async () => {
      let db
      let students = []
      try {
        db = await connectDB()
        students = await db.collection('students').find().toArray()
        return students
      } catch (error) { errorHandler(error) }
    },
    getPerson: async (root, { id }) => {
      let db
      let student = {}
      try {
        db = await connectDB()
        student = await db.collection('students').findOne({ _id: ObjectID(id) })
        return student
      } catch (error) { errorHandler(error) }
    },
    searchItems: async (root, { keyword }) => {
      let db
      let courses
      let people
      try {
        db = await connectDB()
        courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
        people = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
        return [...courses, ...people]
      } catch (error) { errorHandler(error) }
    }
  },
  Mutation: mutations,
  ...types
}
