import React, { useState, useEffect, ChangeEvent } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { BsCloudUpload } from "react-icons/bs";

interface FileUploadProps {
  onChange: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const uploadFile = async () => {
      if (!file) return;

      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Upload File Error :", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setMedia(downloadURL);
              onChange(downloadURL);
            })
            .catch((error) => {
              console.error("Error retrieving URL:", error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      );
    };

    if (file) {
      setIsLoading(true);
      uploadFile();
    }
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const openFileInput = () => {
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <span
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          fontSize: "24px",
          color: media ? "green" : "inherit",
        }}
        onClick={openFileInput}
      >
        <BsCloudUpload />
      </span>
      {/* {isLoading && <div>Yükleniyor...</div>} */}
    </>
  );
};

export default FileUpload;
