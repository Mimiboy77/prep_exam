const cloudinary   = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer       = require('multer');

// --- Connect to Cloudinary using .env credentials ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- Set up Cloudinary storage for multer ---
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         'exam-prep-questions', // folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // only images allowed
    transformation: [{ width: 800, crop: 'limit' }] // max width 800px
  }
});

// --- Create multer upload middleware ---
// single('image') means only one image field named 'image'
const upload = multer({ storage });

module.exports = { cloudinary, upload };