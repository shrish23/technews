import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params: {id: string}}
){

    try {
        const id = params.id;
        const post = await prisma.post.findUnique({where: {id}});
        
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({message: "Could not fetch posts"})
    } 
}

export async function PUT(req: Request, {params}: {params: {id: string}}){
    const {title,content,links,selectedCategory,publicId} = await req.json();
    const id = params.id;
    try {
        const post = await prisma.post.update({
            where: {id},
            data: {
                title,
                content,
                links,
                catName:selectedCategory,
                publicId
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: "Could not update post"})
    }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}){
    const id = params.id;
    try {
        const post = await prisma.post.delete({where: {id}});

        return NextResponse.json(post)
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: "Could not delete post"})
    }
}