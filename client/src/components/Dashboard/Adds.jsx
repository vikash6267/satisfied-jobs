import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [ads, setAds] = useState([]);
  const basePath = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/employer`;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${basePath}/admin/adds`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token, // Include the token in the headers
        },
      });
      // const response = await axios.post(
      //   `http://localhost:8080/employer/admin/adds`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: token, // Include the token in the headers
      //     },
      //   }
      // );
      setImage(null);
      setMessage("Image uploaded successfully: " + response.data.message);
      fetchAds(); // Fetch ads after successful upload
    } catch (error) {
      setMessage(
        "Error uploading image: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${basePath}/admin/adds/get`, {
        headers: {
          Authorization: token,
        },
      });
      // const response = await axios.get(
      //   `http://localhost:8080/employer/admin/adds/get`,
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // );
      setAds(response.data.adds);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDeleteAd = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${basePath}/admin/adds/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // const response = await axios.delete(
      //   `http://localhost:8080/employer/admin/adds/delete/${id}`,
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // );
      setMessage("Ad deleted successfully");
      fetchAds(); // Fetch ads after successful deletion
    } catch (error) {
      setMessage(
        "Error deleting ad: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      <br />
      <br />
      <br />
      <h2>All Adds</h2>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad._id}>
              <td>
                <img src={ad.image} alt="Ad" style={{ maxWidth: "100px" }} />
              </td>
              <td style={{ textAlign: "right" }}>
                <button
                  onClick={() => handleDeleteAd(ad._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageUploader;
