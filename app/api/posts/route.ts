import prisma from "@/lib/prismadb";
import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const { title, content, links, selectedCategory, imageUrl, publicId } = await req.json();
    
    const authorEmail = "dyumanisharma10@gmail.com";

    if(!title || !content){
        return NextResponse.json({error: "Title and Content are required"}, {status: 400});
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                links,
                imageUrl,
                publicId,
                catName: selectedCategory,
                authorEmail
            }
        });

        return NextResponse.json(newPost)
    } catch (error) {
        return NextResponse.json(error)
    }

}

export async function GET(){
    try {
        const posts = await prisma.post.findMany({include: {author: {select: {name: true}}}, orderBy:{
            createdAt: "desc",
        }});

        return NextResponse.json(posts)
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({mesaage: "Some error Occured"},{status: 500})
    }
}