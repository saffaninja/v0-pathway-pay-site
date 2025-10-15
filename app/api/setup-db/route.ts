import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

export async function GET() {
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS merchants (
        id SERIAL PRIMARY KEY,
        merchant_name VARCHAR(255),
        contact_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        cto NUMERIC,
        atv NUMERIC,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    return NextResponse.json({
      ok: true,
      message: "✅ Merchants table created successfully.",
    });
  } catch (error: any) {
    console.error("❌ DB setup failed:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
