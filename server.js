const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const personalizeRuntime = new AWS.PersonalizeRuntime();



// Endpoint to get recommendations for a user
app.get('/api/recommendations/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params; // Extract itemId from request parameters
  
      const params = {
        recommenderArn: process.env.PERSONALIZE_RECOMMENDER_ARN,
        itemId: "9df66bf2-ba87-4d57-b1d3-810d8fffc0e0", // Pass itemId as required by RELATED_ITEMS recipe
        numResults: 4,
      };
  
      const recommendations = await personalizeRuntime.getRecommendations(params).promise();
  
    
  
      res.json(recommendations);
    

    } catch (error) {
      console.error('Error getting recommendations:', error);
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  });
  

// Endpoint to get product details


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});


//const response = await fetch(`http://localhost:3001/api/recommendations/${lastAddedProductId}`);
// app.use(cors({
//     origin: 'http://localhost:3000', // Replace with your frontend's origin
// }));