const axios = require('axios'); // To make HTTP requests
const mongoose = require('mongoose');
const Appointment = require('../modals/Doctor'); 

// Function to save Speech to Text using Whisper AI (Python API)
const saveSpeechToText = async (audioBuffer, userName, userUid) => {
  try {
    // Convert audio buffer to base64 (if needed by the API)
    const audioBase64 = audioBuffer.toString('base64');

    // Send audio buffer to Whisper AI (Python API) for transcription
    const response = await axios.post('http://localhost:5000/transcribe', {
      audio: audioBase64, // Send audio as base64 encoded string
    });

    if (response.data.success) {
      const transcription = response.data.transcription;

      // Save transcription to MongoDB directly
      const appointment = new Appointment({
        userUid,
        userName,
        transcription,
        date: new Date(),
      });

      await appointment.save(); // Save appointment in MongoDB

      return { success: true, transcription, userName, userUid };
    } else {
      throw new Error('Whisper transcription failed');
    }
  } catch (error) {
    console.error('Error processing speech-to-text:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { saveSpeechToText };
