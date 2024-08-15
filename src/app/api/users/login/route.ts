import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
 try {
    const reqBody = await request.json();

    const {email, password} = reqBody;

    const user = await User.findOne({email});

    if(!user){
        return NextResponse.json({error:"User does not exist"},{status:400})
    }
    console.log(user);

    const isValidPassword = await bcryptjs.compare(password, user.password);

    //check if password is correct
    if(!isValidPassword){
        return NextResponse.json({error:"Please Check Your Credentials"},{status:400})
    }

    const tokenData = {
        id:user._id,
        email:user.email,
        username:user.username
    }

    // create token

    const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!,{ expiresIn: '1d' });

    const response = NextResponse.json({
        message:"Login Successfully",
        success: true
    })

    response.cookies.set("token",token,{
        httpOnly:true
    })

    return response
    
 } catch (error:any) {

    return NextResponse.json({error:error.message},{status:500})
    
 }
}