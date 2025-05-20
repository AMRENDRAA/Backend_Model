const nodemailer=require('nodemailer');

const sendEmail= async options =>{

    // 1)create a transporter 
    const transporter =nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user :process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    //2) we need to define email options

    const mailoptions={

        from:' jai shree ram <ram9@example.com>',
        to:options.email,
        subject:options.email,
        text:options.message,
        
    }


    //3 send the email 
    await transporter.sendMail(mailoptions);





};
module.exports=sendEmail;