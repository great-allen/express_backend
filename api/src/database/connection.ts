import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/backend_test');
    console.log('Connected to DB');
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error to be caught in the calling code
  }
};

export default connectDB;
