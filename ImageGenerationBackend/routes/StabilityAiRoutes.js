const express = require("express");
const dotenv = require("dotenv");
const Replicate = require("replicate");
dotenv.config();

const router = express.Router();

const replicate = new Replicate({
    apiKey: process.env.REPLICATE_API_TOKEN,
  });

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });

router.route('/').post(async(req,res) => {
try {
    const {prompt} = req.body;

    // Convert prompt string to object format
    const input = { prompt };

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      { input }
    );

    res.status(200).send(output);
    console.log(output);
} catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
}
})  

module.exports = router;