// "use client";

import React, { useState } from "react";
import "./modalForm.scss";
import { producers, colors } from "@/helpers/constants/inputs";

interface AddProductFormProps {
  setShowModal: (value: React.SetStateAction<any>) => void;
  onSuccessToast: (message: string) => void;
  onErrorToast: (message: string) => void;
  mutate: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  setShowModal,
  onSuccessToast,
  onErrorToast,
  mutate,
}) => {
  const [product, setProduct] = useState({
    title: "",
    color: "",
    img: "",
    price: "",
    producer: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        onSuccessToast("Product successfully saved");
        mutate();
        setShowModal(false);

        // You can perform necessary actions after successful save.
      } else {
        onErrorToast("An error occurred while saving the product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="modalContainer">
        <form onSubmit={handleSubmit}>
          <div className="modalBox">
            <div className="modalHeader">
              <h2>New Employee Details</h2>
              <button
                onClick={() => setShowModal(null)}
                className="close-button"
              >
                x
              </button>
            </div>

            <div className="modalInner">
              <div className="input-container">
                <div className="input-box">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="img">Image</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={product.img}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <div className="input-box">
                  <label htmlFor="color">Color</label>
                  <select
                    id="color"
                    name="color"
                    value={product.color}
                    onChange={handleInputChange}
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
                  <label htmlFor="producer">Producer</label>

                  <select
                    id="producer"
                    name="producer"
                    value={product.producer}
                    onChange={handleInputChange}
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
                  Save Details
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
