import axios from "axios";
export const uploadImage = async (uri) => {
  const apiKey = "bcc0d4f1e120144315a7ef4b0538fc85";
  const formData = new FormData();
  formData.append("image", {
    uri: uri,
    type: "image/jpeg",
    name: "upload.jpg",
  });

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const url = response.data.data.url;
    console.log("Image URL:", url);
    return url;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
  }
};
