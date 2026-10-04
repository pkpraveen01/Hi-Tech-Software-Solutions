import multer from 'multer';


// =====================================================
// STORE FILE IN MEMORY
// =====================================================

const storage = multer.memoryStorage();


// =====================================================
// MULTER CONFIGURATION
// =====================================================

const upload = multer({

  storage,

  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },

  fileFilter: (req, file, cb) => {

    console.log('================================');
    console.log('FILE RECEIVED');
    console.log('File name:', file.originalname);
    console.log('MIME type:', file.mimetype);
    console.log('================================');


    // Accept PDF MIME type
    if (file.mimetype === 'application/pdf') {
      return cb(null, true);
    }


    // Also accept files whose name ends with .pdf
    if (
      file.originalname
        .toLowerCase()
        .endsWith('.pdf')
    ) {
      return cb(null, true);
    }


    return cb(
      new Error('Only PDF files are allowed.')
    );
  },
});


// =====================================================
// EXPORT
// =====================================================

export default upload;