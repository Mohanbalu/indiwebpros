import { getSupabase } from "./supabase";

export async function saveToDatabase(data: any) {
  try {
    const supabase = getSupabase();
    if (data.Source === "Contact Form") {
      console.log("Saving Contact Form to Supabase...");
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            name: data.Name || "Anonymous",
            email: data.Email,
            message: data.Message || "",
            source: data.Source,
          }
        ]);
      
      if (error) throw error;
      return { success: true };
    } else if (data.Source === "Internship Application") {
      console.log("Saving Internship Application to Supabase (internshipbatch2)...");
      const record = {
        full_name: data.Name || "Anonymous",
        email: data.Email,
        phone: data.Phone || "",
        whatsapp: data.WhatsApp || "",
        college: data.College || "",
        degree: data.Degree || "",
        year: data.Year || "",
        domain: data.Domain || "",
        skills: data.Skills || "",
        reason: data.Reason || "",
        referral_code: data.ReferralCode || "BATCH-2",
        source: data.Source,
      };

      const { error } = await supabase
        .from("internshipbatch2")
        .insert([record]);
      
      if (error) {
        console.warn("Could not insert into internshipbatch2 table, attempting internship_applications fallback:", error.message);
        const { error: fallbackError } = await supabase
          .from("internship_applications")
          .insert([record]);
        if (fallbackError) throw error;
      }
      return { success: true };
    } else {
      throw new Error(`Unknown source: ${data.Source}`);
    }
  } catch (err: any) {
    console.error("Error in saveToDatabase:", err);
    return { success: false, error: err.message || "Database operation failed" };
  }
}
