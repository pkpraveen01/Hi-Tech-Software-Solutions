import StudyMaterial from '../models/StudyMaterial.js';
import cloudinary from '../config/cloudinary.js';
import axios from 'axios';


// =====================================================
// UPLOAD STUDY MATERIAL
// =====================================================

export const uploadMaterial = async (req, res) => {
  try {
    const { title, className } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Material title is required.',
      });
    }

    if (!className || !className.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Class is required.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a PDF file.',
      });
    }

    console.log('PDF received:', req.file.originalname);
    console.log('MIME:', req.file.mimetype);
    console.log('Size:', req.file.size);


    // =================================================
    // UPLOAD TO CLOUDINARY
    // =================================================

   const uploadResult = await new Promise(
  (resolve, reject) => {

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: 'hi-tech-study-materials',
          resource_type: 'raw',
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },

        (error, result) => {

          if (error) {
            console.error(
              'Cloudinary upload error:',
              error
            );

            reject(error);
          } else {
            console.log(
              'Cloudinary upload successful'
            );

            console.log(
              'URL:',
              result.secure_url
            );

            console.log(
              'Resource type:',
              result.resource_type
            );

            console.log(
              'Format:',
              result.format
            );

            console.log(
              'Public ID:',
              result.public_id
            );

            resolve(result);
          }
        }
      );

    uploadStream.end(req.file.buffer);
  }
);


    console.log(
      'Cloudinary URL:',
      uploadResult.secure_url
    );

    console.log(
      'Cloudinary Public ID:',
      uploadResult.public_id
    );


    // =================================================
    // SAVE TO MONGODB
    // =================================================

    const material =
      await StudyMaterial.create({

        title: title.trim(),

        className: className.trim(),

        fileUrl: uploadResult.secure_url,

        fileName: req.file.originalname,

        publicId: uploadResult.public_id,

      });


    return res.status(201).json({

      success: true,

      message: 'PDF uploaded successfully.',

      material,

    });

  } catch (error) {

    console.error(
      'UPLOAD ERROR:',
      error
    );

    return res.status(500).json({

      success: false,

      message: 'Failed to upload PDF.',

      error: error.message,

    });

  }
};


// =====================================================
// GET ALL MATERIALS
// =====================================================

export const getMaterials = async (req, res) => {

  try {

    const materials =
      await StudyMaterial.find()
        .sort({ createdAt: -1 });

    res.json({

      success: true,

      materials,

    });

  } catch (error) {

    console.error(
      'GET MATERIALS ERROR:',
      error
    );

    res.status(500).json({

      success: false,

      message: 'Failed to fetch materials.',

    });

  }

};


// =====================================================
// GET MATERIALS BY CLASS
// =====================================================

export const getMaterialsByClass =
  async (req, res) => {

    try {

      const materials =
        await StudyMaterial.find({

          className:
            req.params.className,

        }).sort({

          createdAt: -1,

        });


      res.json({

        success: true,

        materials,

      });

    } catch (error) {

      console.error(
        'GET CLASS MATERIALS ERROR:',
        error
      );

      res.status(500).json({

        success: false,

        message:
          'Failed to fetch class materials.',

      });

    }

  };


// =====================================================
// GET PDF BUFFER FROM CLOUDINARY
// =====================================================

const getPdfFromCloudinary =
  async (material) => {

    console.log(
      'Fetching Cloudinary URL:',
      material.fileUrl
    );


    const response =
      await axios.get(
        material.fileUrl,
        {
          responseType: 'arraybuffer',

          validateStatus: () => true,
        }
      );


    console.log(
      'Cloudinary status:',
      response.status
    );

    console.log(
      'Cloudinary content-type:',
      response.headers['content-type']
    );


    if (response.status !== 200) {

      throw new Error(
        `Cloudinary returned HTTP ${response.status}`
      );

    }


    const contentType =
      response.headers['content-type'] || '';


    if (
      !contentType.includes('pdf') &&
      !contentType.includes('octet-stream')
    ) {

      console.warn(
        'Unexpected Cloudinary content type:',
        contentType
      );

    }


    return Buffer.from(
      response.data
    );

  };

// =====================================================
// VIEW PDF
// =====================================================

export const viewMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found.',
      });
    }

    const response = await axios.get(material.fileUrl, {
      responseType: 'arraybuffer',
    });

    const pdfBuffer = Buffer.from(response.data);

    res.setHeader(
      'Content-Type',
      'application/pdf'
    );

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${material.fileName}"`
    );

    res.setHeader(
      'Content-Length',
      pdfBuffer.length
    );

    res.setHeader(
      'Cache-Control',
      'no-cache'
    );

    return res.end(pdfBuffer);

  } catch (error) {
    console.error(
      'VIEW PDF ERROR:',
      error.response?.status || error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to view PDF.',
      error: error.message,
    });
  }
};


// =====================================================
// DOWNLOAD PDF
// =====================================================

export const downloadMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found.',
      });
    }

    const response = await axios.get(material.fileUrl, {
      responseType: 'arraybuffer',
    });

    const pdfBuffer = Buffer.from(response.data);

    let fileName = material.fileName;

    if (!fileName.toLowerCase().endsWith('.pdf')) {
      fileName += '.pdf';
    }

    res.setHeader(
      'Content-Type',
      'application/pdf'
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`
    );

    res.setHeader(
      'Content-Length',
      pdfBuffer.length
    );

    res.setHeader(
      'Cache-Control',
      'no-cache'
    );

    return res.end(pdfBuffer);

  } catch (error) {
    console.error(
      'DOWNLOAD PDF ERROR:',
      error.response?.status || error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Unable to download PDF.',
      error: error.message,
    });
  }
};


// =====================================================
// DELETE MATERIAL
// =====================================================

export const deleteMaterial =
  async (req, res) => {

    try {

      const material =
        await StudyMaterial.findById(
          req.params.id
        );


      if (!material) {

        return res.status(404).json({

          success: false,

          message:
            'Study material not found.',

        });

      }


      await cloudinary.uploader.destroy(
        material.publicId,
        {
          resource_type: 'raw',
        }
      );


      await StudyMaterial.findByIdAndDelete(
        req.params.id
      );


      res.json({

        success: true,

        message:
          'Study material deleted successfully.',

      });

    } catch (error) {

      console.error(
        'DELETE MATERIAL ERROR:',
        error
      );


      res.status(500).json({

        success: false,

        message:
          'Failed to delete material.',

      });

    }

  };