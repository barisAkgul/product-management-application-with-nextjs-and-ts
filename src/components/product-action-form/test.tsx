// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // if (product.color === "" || product.producer === "") {
//   //   onErrorToast("Empty input");
//   // }

//   try {
//     const res = await fetch("/api/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(product),
//     });

//     if (res.ok) {
//       onSuccessToast("Product successfully saved");
//       mutate();
//       setShowModal(false);

//       // You can perform necessary actions after successful save.
//     } else {
//       onErrorToast("An error occurred while saving the product");
//     }

//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };
