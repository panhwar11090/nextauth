import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const {username, email,password} = reqBody

        console.log('ye body he',reqBody)

        // check if user alredy exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error :"user alredy exits"}, {status:400})

        }

        //hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User ({
            username,
            email,
            password:hashedPassword
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verifcation email

        await sendEmail({email, emailType:"VERIFY", userId:savedUser._id})


        return NextResponse.json({
            message:"User Created Successfully",
            succes: true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
    
}