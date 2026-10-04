import React, { useEffect, useState } from 'react';
import './StudyMaterial.css';


// =====================================================
// BACKEND URL
// =====================================================

// const API_URL = 'http://localhost:5000';
const API_URL = import.meta.env.VITE_API_BASE_URL;


// =====================================================
// STUDY MATERIAL COMPONENT
// =====================================================

const StudyMaterial = () => {

  const [selectedClass, setSelectedClass] = useState('');

  const [materials, setMaterials] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


// =====================================================
// FETCH STUDY MATERIALS
// =====================================================

  useEffect(() => {

    const fetchMaterials = async () => {

      try {

        setLoading(true);
        setError('');

        let url =
          `${API_URL}/api/materials`;

        if (selectedClass) {

          url =
            `${API_URL}/api/materials/class/${selectedClass}`;

        }


        const response =
          await fetch(url);


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Failed to load study materials.'
          );

        }


        setMaterials(
          data.materials || []
        );


      } catch (error) {

        console.error(
          'Study material error:',
          error
        );


        setError(
          error.message ||
          'Unable to load study materials.'
        );


      } finally {

        setLoading(false);

      }

    };


    fetchMaterials();

  }, [selectedClass]);


// =====================================================
// VIEW PDF
// =====================================================

  const handleView = (id) => {

    if (!id) {

      console.error(
        'Material ID is missing.'
      );

      return;

    }


    const viewUrl =
      `${API_URL}/api/materials/view/${id}`;


    console.log(
      'Opening PDF:',
      viewUrl
    );


    window.open(
      viewUrl,
      '_blank',
      'noopener,noreferrer'
    );

  };


// =====================================================
// DOWNLOAD PDF
// =====================================================

  const handleDownload = (id) => {

    if (!id) {

      console.error(
        'Material ID is missing.'
      );

      return;

    }


    const downloadUrl =
      `${API_URL}/api/materials/download/${id}`;


    console.log(
      'Downloading PDF:',
      downloadUrl
    );


    window.location.href =
      downloadUrl;

  };


// =====================================================
// UI
// =====================================================

  return (

    <div className="study-material-page">


      {/* ============================================
          HEADER
      ============================================ */}

      <div className="study-material-header">

        <h1>
          Study Material
        </h1>

        <p>
          Access and download study materials
        </p>

      </div>


      {/* ============================================
          CLASS FILTER
      ============================================ */}

      <div className="class-filter">

        <label htmlFor="study-class">
          Select Class
        </label>


        <select
          id="study-class"
          value={selectedClass}
          onChange={(event) =>
            setSelectedClass(
              event.target.value
            )
          }
        >

          <option value="">
            All Classes
          </option>

          <option value="6">
            Class 6
          </option>

          <option value="7">
            Class 7
          </option>

          <option value="8">
            Class 8
          </option>

          <option value="9">
            Class 9
          </option>

          <option value="10">
            Class 10
          </option>

          <option value="11">
            Class 11
          </option>

          <option value="12">
            Class 12
          </option>

        </select>

      </div>


      {/* ============================================
          LOADING
      ============================================ */}

      {loading && (

        <div className="material-status">

          Loading study materials...

        </div>

      )}


      {/* ============================================
          ERROR
      ============================================ */}

      {!loading && error && (

        <div className="material-error">

          {error}

        </div>

      )}


      {/* ============================================
          NO MATERIALS
      ============================================ */}

      {!loading &&
        !error &&
        materials.length === 0 && (

          <div className="no-materials">

            <div className="no-material-icon">
              📚
            </div>


            <h2>
              No Study Material Available
            </h2>


            <p>
              Study materials will appear here
              after they are uploaded by the admin.
            </p>

          </div>

        )}


      {/* ============================================
          MATERIALS GRID
      ============================================ */}

      {!loading &&
        !error &&
        materials.length > 0 && (

          <div className="materials-grid">

            {materials.map((material) => (

              <div
                className="material-card"
                key={material._id}
              >


                {/* PDF ICON */}

                <div className="pdf-icon">
                  📄
                </div>


                {/* MATERIAL INFORMATION */}

                <div className="material-info">

                  <h2>
                    {material.title}
                  </h2>


                  <p>
                    Class {material.className}
                  </p>


                  <small>
                    {material.fileName}
                  </small>

                </div>


                {/* =================================
                    ACTION BUTTONS
                ================================= */}

                <div className="material-actions">


                  {/* VIEW */}

                  <button
                    type="button"
                    className="view-button"
                    onClick={() =>
                      handleView(
                        material._id
                      )
                    }
                  >

                    👁 View PDF

                  </button>


                  {/* DOWNLOAD */}

                  <button
                    type="button"
                    className="download-button"
                    onClick={() =>
                      handleDownload(
                        material._id
                      )
                    }
                  >

                    ⬇ Download

                  </button>


                </div>

              </div>

            ))}

          </div>

        )}

    </div>

  );

};


export default StudyMaterial;