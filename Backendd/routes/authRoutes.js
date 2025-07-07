const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authControllers');
const { protect } = require('../middlewares/authMiddleware.js');
const { upload } = require('../middlewares/uploadMiddleware.js');
//auth routes

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename}`;
    // Save imageUrl to the user's profile or database as needed
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});

module.exports = router;