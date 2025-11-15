const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');


const list = async (req, res, next) => {
  /*
    #swagger.tags = ['Courses']
  */
  try {
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('courses').find().toArray();
    
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No course found.' });
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
    #swagger.tags = ['Courses']
  */
  try {
    const courseId = req.params.id;
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('courses').findOne({_id: new ObjectId(courseId)});
    
    if (!result) {
      return res.status(404).json({ message: 'Course not found' });
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
    #swagger.tags = ['Courses']
  */
  try {
    const { name, code, credits, instructor } = req.body;
    
    if (!name || !code || !credits || !instructor || !instructor ) {
      return res.status(400).json({ message: 'All fields are required: name, code, credits, instructor' });
    }
    
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('courses').insertOne({ name, code, credits, instructor });
    
    res.status(201).json({
      message: 'Course created successfully',
      courseId: result.insertedId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  /*
    #swagger.tags = ['Courses']
  */
  try {
        const courseId = req.params.id;
        const { name, code, credits, instructor } = req.body;
    
        if (!ObjectId.isValid(courseId)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }
  
        const db = mongodb.getDb().db(process.env.DB_NAME);
        const toUpdate = {};
        if (name)         toUpdate.name        = name;
        if (code)         toUpdate.code        = code;
        if (credits)      toUpdate.credits     = credits;
        if (instructor)   toUpdate.instructor  = instructor;
        
    
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
    #swagger.tags = ['Courses']
  */
  try {
    const courseId = req.params.id;
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const db = mongodb.getDb().db(process.env.DB_NAME);
    const result = await db.collection('courses').deleteOne({ _id: new ObjectId(courseId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { list, byId, create, update, remove }; 

