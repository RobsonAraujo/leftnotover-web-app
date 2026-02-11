import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : null;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const NOTION_KEY = process.env.NOTION_SECRET;
    const DATABASE_ID = process.env.NOTION_DB;

    if (!NOTION_KEY || !DATABASE_ID) {
      return NextResponse.json(
        { error: "Notion not configured on server" },
        { status: 500 },
      );
    }

    // Fetch database schema to determine property types
    const dbRes = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${NOTION_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      },
    );

    if (!dbRes.ok) {
      const text = await dbRes.text();
      return NextResponse.json(
        { error: "Failed to read Notion database schema", details: text },
        { status: dbRes.status },
      );
    }

    const dbInfo = await dbRes.json();
    const props = dbInfo.properties || {};

    // Build properties payload based on actual property types
    const propertiesPayload: Record<string, any> = {};

    // Prefer a property literally named 'Email' if it exists
    if (props["Email"]) {
      const type = props["Email"].type;
      if (type === "email") {
        propertiesPayload["Email"] = { email };
      } else if (type === "title") {
        propertiesPayload["Email"] = { title: [{ text: { content: email } }] };
      } else if (type === "rich_text") {
        propertiesPayload["Email"] = {
          rich_text: [{ text: { content: email } }],
        };
      } else {
        // fallback to setting as rich_text
        propertiesPayload["Email"] = {
          rich_text: [{ text: { content: email } }],
        };
      }
    } else {
      // Try to find an email property, otherwise use the database title property
      const emailProp = Object.keys(props).find(
        (k) => props[k].type === "email",
      );
      const titleProp = Object.keys(props).find(
        (k) => props[k].type === "title",
      );

      if (emailProp) {
        propertiesPayload[emailProp] = { email };
      } else if (titleProp) {
        propertiesPayload[titleProp] = {
          title: [{ text: { content: email } }],
        };
      } else {
        // As a last resort, pick the first property and set as rich_text (may still fail)
        const firstProp = Object.keys(props)[0];
        if (firstProp) {
          propertiesPayload[firstProp] = {
            rich_text: [{ text: { content: email } }],
          };
        }
      }
    }

    const payload = {
      parent: { database_id: DATABASE_ID },
      properties: propertiesPayload,
    };

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Notion API error", details: text },
        { status: res.status },
      );
    }

    // Send a thank-you email via Resend if configured
    const RESEND_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM_EMAIL;
    let emailSendResult: any = null;

    if (RESEND_KEY && RESEND_FROM) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_KEY}`,
          },
          body: JSON.stringify({
            from: RESEND_FROM,
            to: email,
            subject: "Welcome to LeftNotOver – You're in!",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a6966; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header --> <tr> <td align="center" style="padding: 40px 20px; border-bottom: 1px solid #1f8f8b;"> <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;"> LeftNotOver </h1> <p style="margin: 0; font-size: 12px; color: #bfe7e5; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase;"> Fresh • Affordable • Sustainable </p> </td> </tr> <!-- Content --> <tr> <td style="padding: 40px 32px; color: #ffffff;"> <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #ffffff;"> You're in! 🎉 </h2> <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #d7f0ee;"> Hi there, </p> <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #d7f0ee;"> Thanks so much for joining LeftNotOver. We're thrilled to have you as part of our community of conscious consumers working to reduce food waste while making great food more affordable. </p> <!-- Features --> <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;"> <tr> <td style="padding: 14px 0;"> <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #ffffff;"> 🌍 Reduce Food Waste </p> <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #bfe7e5;"> Help connect restaurants, bakeries, and hotels with people who value fresh food at better prices. </p> </td> </tr> <tr> <td style="padding: 14px 0;"> <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #ffffff;"> 💚 Affordable Quality </p> <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #bfe7e5;"> Save money while enjoying high-quality meals from local businesses. </p> </td> </tr> <tr> <td style="padding: 14px 0;"> <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: 600; color: #ffffff;"> 🚀 Coming Soon </p> <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #bfe7e5;"> We're building something meaningful. You'll be among the first to know when we launch. </p> </td> </tr> </table> <p style="margin: 30px 0 0 0; font-size: 15px; line-height: 1.6; color: #d7f0ee;"> Stay tuned for launch updates and occasional behind-the-scenes insights. We'll only send what truly matters. </p> <!-- CTA --> <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;"> <tr> <td align="center"> <a href="https://leftnotover.com" style="display: inline-block; padding: 14px 32px; background-color: #ffffff; color: #0a6966; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.12);"> Learn More About Us </a> </td> </tr> </table> <p style="margin: 28px 0 0 0; font-size: 14px; line-height: 1.5; color: #bfe7e5;"> Questions? Just reply to this email — we'd love to hear from you. </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style="padding: 28px 20px; border-top: 1px solid #1f8f8b;"> <p style="margin: 0 0 10px 0; font-size: 13px; color: #bfe7e5;"> © 2026 LeftNotOver. All rights reserved. </p> <p style="margin: 0; font-size: 12px;"> <a href="#" style="color: #3dcdc8; text-decoration: none;">Privacy Policy</a> &nbsp;•&nbsp; <a href="#" style="color: #3dcdc8; text-decoration: none;">Unsubscribe</a> </p> </td> </tr> </table> </td> </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
          }),
        });

        if (!emailRes.ok) {
          const txt = await emailRes.text();
          emailSendResult = {
            ok: false,
            details: txt,
            status: emailRes.status,
          };
        } else {
          emailSendResult = { ok: true };
        }
      } catch (e) {
        emailSendResult = { ok: false, details: String(e) };
      }
    }

    return NextResponse.json({ success: true, emailSent: emailSendResult });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 },
    );
  }
}
