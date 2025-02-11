const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const Transcription = require('../models/Transcription'); // Corrected path if needed

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// POST: Transcribe an audio file
router.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Log the received file path
        console.log("Received file at path:", filePath);

        // Use FormData to send the file to the Whisper API
        const FormData = require('form-data');
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const whisperResponse = await axios.post(
            'http://localhost:5001/transcribe',
            form,
            { headers: form.getHeaders() } // This will ensure proper headers are set for multipart form-data
        );

        console.log("Whisper AI Response:", whisperResponse.data); // Log Whisper's response

        // Remove temporary file
        fs.unlinkSync(filePath);

        const transcript = whisperResponse.data.text;

        // Save transcription to MongoDB
        const transcription = await Transcription.create({ transcript });

        console.log("Transcription saved:", transcription);

        res.json({ transcription });
    } catch (error) {
        console.error("Error during transcription:", error.message); // Log the error message
        console.error(error.stack); // Log the stack trace for more details
        res.status(500).json({ error: "An error occurred during transcription.", details: error.message });
    }
});


// GET: Fetch all transcriptions
router.get('/transcriptions', async (req, res) => {
    try {
        const transcriptions = await Transcription.find();
        
        if (!transcriptions || transcriptions.length === 0) {
            console.log("No transcriptions in the database.");
            return res.status(404).json({ error: "No transcriptions found." });
        }
        
        res.json(transcriptions); // Return the saved transcriptions
    } catch (error) {
        console.error("Error fetching transcriptions:", error.message);
        res.status(500).json({ error: "Unable to fetch transcriptions." });
    }
});

module.exports = router;
