const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});
app.post('/api/convert-story', (req, res) => {
    try {
        const { story } = req.body;
        if (!story) {
            return res.status(400).json({ error: 'Story text is required' });
        }
        res.json({ success: true, message: 'Story received for processing', storyLength: story.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/generate-video', (req, res) => {
    try {
        const { storyId, images, voiceOption } = req.body;
        if (!storyId) {
            return res.status(400).json({ error: 'Story ID is required' });
        }
        res.json({ success: true, message: 'Video generation started', videoId: `video_${Date.now()}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;