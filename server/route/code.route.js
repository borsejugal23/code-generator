// server/route/code.route.js
const express = require('express');
const router = express.Router();
const Code = require('../model/code.model');

// Route to generate a new code
router.get('/api/codes', async (req, res) => {
  try {
    const newCode = await new Code({ value: generateCode() });
    // console.log(newCode)
    await newCode.save();
    res.status(200).json({ code: newCode.value });
  } catch (error) {
    // console.error('Error in generating code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to check and use a code
router.post('/api/codes/use', async (req, res) => {
  const userCode = req.body.code;

  try {
    const existingCode = await Code.findOne({ value: userCode });

    if (!existingCode) {
      return res.json({ error: 'Enter a valid code' });
    }

    if (existingCode.used) {
      return res.json({ error: 'This code has already been used' });
    }

    // if (isCodeExpired(existingCode.createdAt)) {
    //   return res.json({ error: 'The code has expired' });
    // }

    // Mark the code as used
    existingCode.used = true;
    await existingCode.save();

    res.json({ message: 'Code is correct' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>URL Check</title>
      </head>
      <body>
        <h1>URL is working fine!</h1>
      </body>
    </html>
  `);
});
// Helper function to generate a random code
function generateCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Helper function to check if a code is expired
// createdAt: 2024-01-28T05:44:06.702Z
// function isCodeExpired(createdAt) {
//   console.log(createdAt);
//   const now = new Date();
//   const diffInSeconds = (now - createdAt) / 1000;
//   console.log(diffInSeconds)
//   return diffInSeconds > 60;
// }

module.exports = router;
