"use client";

import React, { useEffect, useState } from "react";
import "./modalForm.scss";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { producers, colors } from "@/helpers/constants/inputs";

interface UpdateProductFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccessToast: (message: string) => void;
  onErrorToast: (message: string) => void;
  mutate: () => void;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  setShowModal,
  onSuccessToast,
  onErrorToast,
  mutate,
}) => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [editedData, setEditedData] = useState<any>();

  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  useEffect(() => {
    if (data) {
      setEditedData(data);
    }
  }, [data]);

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...editedData, [field]: value };
    setEditedData(updatedData);
  };

  // for uncontrolled input error
  if (!editedData) return <div>Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        onSuccessToast("Product successfully updated");
        mutate();
        setShowModal(false);

        // You can perform necessary actions after successful save.
      } else {
        onErrorToast("An error occurred while updating the product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modalContainer">
      <form onSubmit={handleSubmit}>
        <div className="modalBox">
          <div className="modalHeader">
            <h2>New Employee Details</h2>
            <button
              onClick={() => setShowModal(false)}
              className="close-button"
            >
              x
            </button>
          </div>

          <div className="modalInner">
            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  required
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  value={editedData?.title || ""}
                />
              </div>
              <div className="input-box">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  required
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  value={editedData?.price || ""}
                />
              </div>
            </div>

            <div className="input-box">
              <label htmlFor="">image</label>
              <input
                type="text"
                // required
                onChange={(e) => handleInputChange("img", e.target.value)}
                value={editedData?.img || ""}
              />
            </div>

            <div className="input-container">
              <div className="input-box">
                <label htmlFor="">Color</label>

                <select
                  id="color"
                  name="color"
                  value={editedData?.color || ""}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                >
                  <option value="">Select Color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="">Producer</label>

                <select
                  id="producer"
                  name="producer"
                  value={editedData?.producer || ""}
                  onChange={(e) =>
                    handleInputChange("producer", e.target.value)
                  }
                >
                  <option value="">Select Producer</option>
                  {producers.map((producer, index) => (
                    <option key={index} value={producer}>
                      {producer}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modalFooter">
              <button className="add-btn" type="submit">
                {/* {loading ? "Saving..." : "Save Details"} */}
                Save Details
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
