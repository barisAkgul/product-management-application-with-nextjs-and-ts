"use client";
import { useState } from "react";
import "./productsPage.scss";
import DataTable from "@/components/data-table/DataTable";

import { GridColDef } from "@mui/x-data-grid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useSWR from "swr";

import { Loader } from "@/components/loader/Loader";
import AddProductForm from "@/components/product-action-form/AddProductForm";
import { formatDate } from "@/utils/general";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noimage.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
    renderCell: (params) => {
      return formatDate(params.row.createdAt);
    },
  },
];

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const Products = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error, mutate } = useSWR(`/api/products`, fetcher);

  const transformedData = data?.map((item: any, index: number) => ({
    ...item,
    id: index,
  }));

  const handleSuccessToast = (message: string) => {
    toast.success(message);
  };

  const handleErrorToast = (message: string) => {
    toast.error(message);
  };
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          slug="products"
          columns={columns}
          rows={transformedData}
          onSuccessToast={handleSuccessToast}
          onErrorToast={handleErrorToast}
          mutate={mutate}
        />
      )}

      {open && (
        <AddProductForm
          setShowModal={setOpen}
          onSuccessToast={handleSuccessToast}
          onErrorToast={handleErrorToast}
          mutate={mutate}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Products;
