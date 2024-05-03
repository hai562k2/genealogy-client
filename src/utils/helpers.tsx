import axiosClient from "../axios/axiosClient";

export async function uploadFile(data: File[]) {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append("files", file);
  });
  return await axiosClient.post("files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export const uploadApiManagement = {
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append("files", file);
    return axiosClient.post("files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
