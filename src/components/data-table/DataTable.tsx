"use client";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import Link from "next/link";
import { useState } from "react";
import UpdateProductForm from "../product-action-form/UpdateProductForm";

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  slug: string;
  onSuccessToast: (message: string) => void;
  onErrorToast: (message: string) => void;
  mutate: () => void;
}

const DataTable: React.FC<DataTableProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    console.log("i am here ", id);
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      props.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link
            href={{
              pathname: props.slug,
              query: { id: params.row._id },
            }}
            onClick={() => setOpen(true)}
          >
            <img src="/view.svg" alt="" />
          </Link>

          <div className="delete" onClick={() => handleDelete(params.row._id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      {open && (
        <UpdateProductForm
          setShowModal={setOpen}
          onSuccessToast={props.onSuccessToast}
          onErrorToast={props.onErrorToast}
          mutate={props.mutate}
        />
      )}
    </div>
  );
};

export default DataTable;
