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
            subject: "Thanks for joining LeftNotOver",
            html: `<div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial; color:#0f172a"><p>Hi,</p><p>Thanks for signing up for LeftNotOver. We appreciate your interest — we'll keep you updated as we launch.</p><p>— The LeftNotOver Team</p></div>`,
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
