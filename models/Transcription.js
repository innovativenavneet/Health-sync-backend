const mongoose = require('mongoose');

// Define the schema for the transcription document
const transcriptionSchema = new mongoose.Schema({
    transcript: { type: String, required: true },  // Store the transcription text
    createdAt: { type: Date, default: Date.now },  // Automatically set creation date
});

// Create the model from the schema
const Transcription = mongoose.model('Transcription', transcriptionSchema);

module.exports = Transcription;
