const Home = require('../modals/Home');

// Get all homepage items
exports.getHomeItems = async (req, res) => {
  try {
    const items = await Home.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch home items' });
  }
};

// Create a new homepage item
exports.createHomeItem = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newItem = new Home({ title, description, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create home item' });
  }
};
