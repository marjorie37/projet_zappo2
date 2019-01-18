const nodemailer = require("nodemailer");

const Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "zappo.pizzeria@gmail.com",
    pass: "wildzappo7"
  }
});

const Head = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="fr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Fluid Grid Master</title>

    <style type="text/css">

        /* CLIENT-SPECIFIC STYLES */
        body {
            color:#2c3e50;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-size:1.2em;
        }
        small, h1, h2 {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */

        img {
            border: 0;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* ANDROID CENTER FIX */

        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>

<body style="margin:0; padding:0; background-color:#F2F2F2;">
    <center>

        <div style="background-color:#F2F2F2; max-width: 640px; margin: auto;">
            <!--[if mso]>
    <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" align="center">
    <tr>
    <td>
    <![endif]-->`;

const Header = title =>
  `<table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px; width:100%;" bgcolor="#FFFFFF">
            <tr>
                <td align="center" valign="top" style="padding:10px;">
  
                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; width:100%;">
                        <tr>
                            <td align="center" valign="top" style="padding:0px;">
                                <img src="http://46.101.96.87/images/header.gif" width="100%" height="" style="margin:0; padding:0; border:none; display:block;" border="0" alt="" alt="Zappo, bistrot italien"
                                />
                            </td>
                        </tr>
                        <!-- ---------- SPACER ------------>
                        <tr>
                            <td height="20" style="font-size:20px; line-height:10px;" class="mobileOn">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="left" valign="top" style="padding:0px 20px; background:#efe5ba;">
                                <p style="font-size:40px; color:#2c3e50;line-height:40px;">${title}</p>
                            </td>
                        </tr>
                    </table>
  
                </td>
            </tr>
        </table>
  `;

const Message = (name, text, innerHtml = "", actionButton = "") =>
  `
  <table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px; width:100%;" bgcolor="#FFFFFF">
            <tr>
                <td align="center" valign="top" style="padding:10px;">
  
                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; width:100%;">
                        <tr>
                            <td align="left" valign="top" style="padding:0px;">
                                <p>Bonjour ${name},</p>
                                <p>${text}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        ${innerHtml}
        <table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px; width:100%;" bgcolor="#FFFFFF">
            <tr>
                <td align="center" valign="top" style="padding:10px;">
  
                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; width:100%;">
                        <tr>
                            <td width="300" align="left" valign="top" style="padding:10px;">
                                <p style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">
                                    <i>A bientôt !</i>
                                    <br />L'équipe Zappo.
                                </p>
                            </td>
                            ${actionButton}
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
      `;

const Footer = `<table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px; width:100%;" bgcolor="#FFFFFF">
<tr>
    <td align="center" valign="top" style="padding:10px;">

        <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; width:100%;">
            <tr>
                <td align="center" valign="top" style="padding:10px;">
                    <p>
                        <small style="color:grey; font-size:0.7em;">Zappo.fr © 2018 Zappo,  6 rue Challemel-Lacour, 69007 Lyon.            
                        </small>
                    </p>
                </td>
            </tr>
        </table>

    </td>
</tr>
</table>`;

const End = `

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>

</center>
</body>

</html>`;

module.exports = { Message, Transporter, Head, Header, Footer, End };
