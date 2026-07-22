import type { VercelRequest, VercelResponse } from '@vercel/node';
import { saveToDatabase } from '../src/lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const data = req.body || {};
    if (!data.email) return res.status(400).json({ success: false, error: "Email is required" });

    const date = new Date().toISOString();
    
    console.log("Processing internship application for:", data.email);
    
    let result: { success: boolean; error?: any } = { success: true, error: null };
    try {
      result = await saveToDatabase({
        Date: date, 
        Source: 'Internship Application', 
        Name: data.fullName || 'Anonymous', 
        Email: data.email, 
        Phone: data.phone || '',
        WhatsApp: data.whatsapp || data.phone || '',
        College: data.college || '', 
        Degree: data.degree || '', 
        Year: data.year || data.yearOfStudy || '', 
        Domain: data.course || data.domain || '',
        Skills: `${data.internshipType || ''} | ${data.skills || ''} | ${data.branch || ''} | ${data.city || ''}`, 
        Reason: data.reason || '',
        ReferralCode: 'BATCH-2'
      });
    } catch (dbErr: any) {
      console.warn("Database sync error (falling back to success response):", dbErr.message);
      result = { success: false, error: dbErr.message };
    }

    return res.status(200).json({ 
      success: true, 
      sync: result.success,
      message: "Application received successfully!"
    });
  } catch (error: any) {
    console.error("Critical error in /api/internship-apply:", error);
    return res.status(200).json({ 
      success: true, 
      sync: false,
      message: "Application submitted successfully!"
    });
  }
}

