import { NextResponse, NextRequest } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

// GET Request
export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    const product = await Product.findById(id);

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// DELETE Request
export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    await Product.findByIdAndDelete(id);

    return new NextResponse("Product has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// PUT Request
export const PUT = async (request: NextRequest, { params, body }: any) => {
  const { id } = params;

  try {
    await connect();

    const { title, color, price, producer, inStock, img } =
      await request.json(); // Güncellenecek veriyi al
    console.log(body);
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, color, price, producer, inStock, img },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
