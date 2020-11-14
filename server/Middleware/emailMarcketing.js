const nodemailer = require("nodemailer");
const config = require("config");
const user = config.get("userEMAIL");
const pass = config.get("password");

const sendEmailMarcketing = (data) => {
  let images = data.images
    ? data.images.map((image) => {
        return `<img src="${image}" alt="add"/>`;
      })
    : `<br/>`;
  let Target = data.index
    ? ` <p>Mr/Mss ${data.name} ${data.lastname}</p>`
    : `Mr,Mss`;
  const output = `
  <div style="
  font-family: verdana;
  max-width: 960px;
  background-color: #f5f6fa;
  border-radius: 6px;
  margin: 15px auto;
  text-align: center;
  ">
  <div
  style="
    font-family: verdana;
    max-width: 960px;
    background-color: #487eb0;
    border-radius: 6px;
    margin: 15px auto;
    padding: 5px;
   ">
  <div style="max-width: 150px; border-radius: 6px">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/aoumi-62.appspot.com/o/zim2.PNG?alt=media&token=21fd6110-0aaa-4ad3-8a82-876d701e21df"
      alt="ZimStore"
      width="40%"
    />
  </div>
</div>
   ${Target}
    <br/>
    <div style="padding: 15px">
       <p>${data.body}</p>
    </div>
    <div style="display: flex;
    height: 300px;
    overflow-x: scroll;">
    ${images}
    </div>
    </div>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //host: "mail.Gmail.com",
    service: "Gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"ZimProduction" <${user}>`, // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports = { sendEmailMarcketing };
