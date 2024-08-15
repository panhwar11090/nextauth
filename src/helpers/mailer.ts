import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        // created a hash token 

        const hasedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hasedToken, verifyTokenExpiry:Date.now() + 3600000}
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hasedToken,forgotPasswordTokenEpiry:Date.now() + 3600000}
            )
        }

        const transporter =  nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port:  2525,
            auth: {
              user: process.env.USERNAME_EMAIL,
              pass: process.env.PASSWORD_EMAIL,
            }
          });

        const mailOptions = {
            from: 'huzaifaa190@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>`
        }

        const mailresponse =  await transporter.sendMail(mailOptions);
        return mailresponse
        
    } catch (error:any) {
        throw new Error(error.message);
    }

}