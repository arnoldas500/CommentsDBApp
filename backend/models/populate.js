import mongoose from 'mongoose';
import Data from './models/barcodeData';

const bcData = [
  /*{
    title: 'La La Land',
    poster: 'https://i.imgur.com/po7UezG.jpg',
    genre: 'Drama/Romance',
  },*/
    {
	site: 'walmart stony brook',
	name: 'Arnoldas Kurbanovas',
	email: 'akurbanovas@yahoo.com',
	feedback: 'there is a window borken',
	phoneNum: 6317047013,
	severity: 7,
	secure: false,
	urgent: yes,
    },
    
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bcData');

// Go through each entry
bcData.map(data => {
  // Initialize a model with barcode data
  const curData = new Data(data);
  // and save it into the database
  curData.save();
});
