import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user-routes.js';
import loginRoutes from './routes/login-routes.js';
import mongoose from 'mongoose';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use((error,req,res,next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb+srv://mahidharkosigi:Madhu9852@cluster0.gp5yozb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


