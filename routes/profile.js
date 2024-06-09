const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

// Define Profile model based on the schema
const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  github: String,
  techStacks: { 
    type: Map, 
    of: Number 
  }
});

const Profile = mongoose.model('Profile', profileSchema);

// Route to create a new profile
router.post('/', async (req, res) => {
    try {
      const { firstName, lastName, username, email, github, techStacks, correctAnswerIndex } = req.body;
  
      
      const initializedTechStacks = new Map();
      
      techStacks.forEach(stack => {
        initializedTechStacks.set(stack, 0);
      });
  
      const profile = new Profile({
        firstName,
        lastName,
        username,
        email,
        github,
        techStacks: initializedTechStacks,
        correctAnswerIndex
      });
  
      const savedProfile = await profile.save();
      res.status(201).send(savedProfile);
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).send('Error creating profile');
    }
  });
  
  


router.get('/:id', async (req, res) => {
    const Id = req.params.id
  try {
    const profile = await Profile.find({_Id:Id});
    res.status(200).send(profile);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).send('Error fetching profiles');
  }
});


router.put('/updateScoreByUsername', async (req, res) => {
  try {
    const { username, techStack, newScore } = req.body;
    console.log("the new score is : ",newScore)
    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    // Update the score for the specified tech stack
    profile.techStacks.set(techStack, newScore);

    await profile.save();
    res.send(profile);
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).send('Error updating score');
  }
});

module.exports = router;
