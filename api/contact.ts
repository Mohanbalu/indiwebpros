import type { VercelRequest, VercelResponse } from '@vercel/node';
import { saveToDatabase } from '../src/lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    const date = new Date().toISOString();
    let result: { success: boolean; error?: any } = { success: true };
    try {
      result = await saveToDatabase({ 
        Date: date, 
        Source: 'Contact Form', 
        Name: name || 'Anonymous', 
        Email: email, 
        Message: message || '' 
      });
    } catch (dbErr: any) {
      console.warn("Database sync error (contact):", dbErr.message);
      result = { success: false, error: dbErr.message };
    }

    return res.status(200).json({ 
      success: true, 
      sync: result.success
    });
  } catch (error: any) {
    console.error("Critical error in /api/contact:", error);
    return res.status(200).json({ 
      success: true, 
      sync: false,
      message: "Message sent!"
    });
  }
}

