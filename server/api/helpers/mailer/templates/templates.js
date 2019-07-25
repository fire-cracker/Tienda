const verifyTemplate = (cutomerName, orderDetails) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Coinbase</title>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0pt auto; padding: 0px; font-family:Arial, sans-serif; background-color:#555555">
<div class="es-wrapper-color" style="background-color:#555555; min-height: 100%; padding: 3%;"> 
  <table  class="es-content-body" id="main" width="600" height="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F7FA" align="center"  style="margin:5% auto; table-layout: fixed;">
    <tbody>
      <tr>
        <tr style="border-collapse:collapse;">
          <td
            style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px;background-color:#191919;"
            bgcolor="#191919">
            <table width="100%" cellspacing="0" cellpadding="0"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
              <tr style="border-collapse:collapse;">
                <td width="580" align="center" style="padding:0;Margin:0;">
                  <table width="100%" cellspacing="0" cellpadding="0"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                    <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;">
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333;">
                          <a target="_blank" class="adapt-img" alt width="105"
                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:30px;text-decoration:none;color:#3CA7F1;"
                            href=""><strong>Tienda</strong></a> </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="border-collapse:collapse;">
          <td
            style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#FFCC99;"
            bgcolor="#ffcc99">
            <table width="100%" cellspacing="0" cellpadding="0"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
              <tr style="border-collapse:collapse;">
                <td width="560" align="center" style="padding:0;Margin:0;">
                  <table width="100%" cellspacing="0" cellpadding="0"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                    <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                        <div>
                          <h2
                            style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#242424;">
                            <span style="font-size:30px;"><strong>Your order is confirmed. </strong></span><br></h2>
                        </div>
                      </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-left:10px;">
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#242424;">
                          Hi ${cutomerName}, we've received order № ${orderDetails.order_id} and are working on it now.<br></p>
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#242424;">
                          We'll email you an update when we've shipped it.<br></p>
                      </td>
                    </tr>
                    <tr class="es-visible-simple-html-only" style="border-collapse:collapse;">
                      <td align="center"
                        style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px;"> <span
                          class="es-button-border"
                          style="border-style:solid;border-color:#2CB543;background:#191919 none repeat scroll 0% 0%;border-width:0px;display:inline-block;border-radius:20px;width:auto;">
                          <a href="https://viewstripo.email/" class="es-button" target="_blank"
                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#191919;border-width:10px 35px;display:inline-block;background:#191919 none repeat scroll 0% 0%;border-radius:20px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">View
                            your order details</a> </span> </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="border-collapse:collapse;">
          <td
            style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:15px;background-color:#F8F8F8;"
            bgcolor="#f8f8f8">
            <table width="100%" cellspacing="0" cellpadding="0"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
              <tr style="border-collapse:collapse;">
                <td width="580" align="center" style="padding:0;Margin:0;">
                  <table width="100%" cellspacing="0" cellpadding="0"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                    <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;">
                        <h2
                          style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#191919;">
                          Items ordered<br></h2>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="border-collapse:collapse;">
          <td
            style="Margin:0;padding-bottom:5px;padding-left:20px;padding-right:20px;padding-top:25px;background-color:#F8F8F8;"
            bgcolor="#f8f8f8">

            <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
            <table class="es-right" cellspacing="0" cellpadding="0" align="center"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
              <tr style="border-collapse:collapse;">
                <td width="270" align="center" style="padding:0;Margin:0;">
                  <table width="100%" cellspacing="0" cellpadding="0"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="padding:0;Margin:0;">
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333;">
                          <span style="font-size:16px;"><strong style="line-height:150%;">${orderDetails.product_name}</strong></span></p>
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333;">
                          ${orderDetails.attributes}</p>
                      </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;">
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333;">
                          <span style="font-size:15px;"><strong style="line-height:150%;">Item Price:</strong> $${orderDetails.unit_cost}</span>
                        </p>
                        <p
                          style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333;">
                          <span style="font-size:15px;"><strong>Qty: </strong>${orderDetails.quantity}</span></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!--[if mso]></td></tr></table><![endif]-->
          </td>
        </tr>
        <tr style="border-collapse:collapse;">
          <td
            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;background-color:#F8F8F8;"
            bgcolor="#f8f8f8">
            <table width="100%" cellspacing="0" cellpadding="0"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
              <tr style="border-collapse:collapse;">
                <td width="580" align="center" style="padding:0;Margin:0;">
                  <table width="100%" cellspacing="0" cellpadding="0"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                    <tr style="border-collapse:collapse;">
                      <td bgcolor="#f8f8f8" align="center"
                        style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px;">
                        <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"
                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td
                              style="padding:0;Margin:0px;border-bottom:1px solid #191919;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:15px;">
                        <table class="cke_show_border" width="240" height="101" cellspacing="1" cellpadding="1" border="0"
                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                          <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;"><strong>Subtotal:</strong></td>
                            <td style="padding:0;Margin:0;text-align:right;">$${orderDetails.subtotal}</td>
                          </tr>
                          <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;"><strong>Shipping:</strong></td>
                            <td style="padding:0;Margin:0;text-align:right;">$4.98</td>
                          </tr>
                          <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;"><strong>Sales Tax:</strong></td>
                            <td style="padding:0;Margin:0;text-align:right;">$1.00</td>
                          </tr>
                          <tr style="border-collapse:collapse;">
                            <td style="padding:0;Margin:0;"><span style="font-size:18px;line-height:36px;"><strong>Order
                                  Total:</strong></span></td>
                            <td style="padding:0;Margin:0;text-align:right;"><span
                                style="font-size:18px;line-height:36px;"><strong>$605.98</strong></span><br></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tr>
    </tbody>
  </table>
  </div>
</body>

</html>
`;

export default verifyTemplate;
