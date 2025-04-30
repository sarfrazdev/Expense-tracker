 import { API_PATH } from "./apiPath";
 import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATH.Image.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Image uploaded successfully:", response.data);
        return response; 
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; 
    } finally {
        console.log("Upload attempt finished.");
    }
};
export default uploadImage;
