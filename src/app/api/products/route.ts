import { NextResponse, NextRequest } from "next/server";
import connect from "@/utils/db";
import Product from "@/models/Product";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  await connect();
  const newProduct = new Product(body);

  try {
    await newProduct.save();

    return new NextResponse("Product has been created", { status: 201 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    await connect();

    const products = await Product.find();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
