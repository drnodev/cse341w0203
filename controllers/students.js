const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const list = async (req, res, next) => {
  /*
    #swagger.tags = ['Students']
  */
  try {
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('students').find().toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No student found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



const byId = async (req, res, next) => {
  /*
    #swagger.tags = ['Students']
  */
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('students').findOne({_id: new ObjectId(contactId)})

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const create = async (req, res) => {
  /*
    #swagger.tags = ['Students']
  */
  try {
    const { name, email, age , major, registrationDate, status, gpa } = req.body;

    if (!name || !email || !age || !major || !registrationDate || !status || !gpa) {
      return res.status(400).json({ message: 'All fields are required: name, email, age, major, registrationDate, status, gpa' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('students').insertOne({ name , email ,age ,major ,registrationDate ,status ,gpa });

    res.status(201).json({
      message: 'Student created successfully.',
      contactId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const update = async (req, res) => {
  /*
    #swagger.tags = ['Students']
  */
  try {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const { name, email, age , major, registrationDate, status, gpa } = req.body;

    if (!name || !email || !age || !major || !registrationDate || !status || !gpa) {
      return res.status(400).json({ message: 'At least one field is required: name, email, age, major, registrationDate, status, gpa' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const toUpdate = {};
    if (name)               toUpdate.name               = name;
    if (age)                toUpdate.age                = age;
    if (major)              toUpdate.major              = major;
    if (registrationDate)   toUpdate.registrationDate   = registrationDate;
    if (email)              toUpdate.email              = email;
    if (status)             toUpdate.status             = status;
    if (gpa)                toUpdate.gpa                = gpa;

    const result = await db
      .collection('students')
      .updateOne({ _id: new ObjectId(contactId) }, { $set: toUpdate });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



const remove = async (req, res) => {
  /*
    #swagger.tags = ['Students']
  */
  try {
    const contactId = req.params.id;
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('students').deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



module.exports = { list, byId, create, update, remove }; 

