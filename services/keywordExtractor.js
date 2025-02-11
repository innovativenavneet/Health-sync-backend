const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs-node');

const extractKeywords = async (text) => {
    const model = await use.load();
    const embeddings = await model.embed([text]);

    // Logic to extract keywords (e.g., based on cosine similarity or clustering)
    const words = text.split(/\s+/);
    const scores = words.map((word) => {
        // Example: Use word embeddings to rank keywords
        return { word, score: Math.random() }; // Replace with actual logic
    });

    // Sort and select top keywords
    const topKeywords = scores
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((item) => item.word);

    return topKeywords;
};

module.exports = extractKeywords;
