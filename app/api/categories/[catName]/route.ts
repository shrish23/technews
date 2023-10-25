import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName;
    const post = await prisma.category.findUnique({
      where: { catName },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch posts" });
  }
}
