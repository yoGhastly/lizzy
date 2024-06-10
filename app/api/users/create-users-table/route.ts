import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/*
 *
 * id (INT PRIMARY KEY): Unique identifier for each user.
 * email (VARCHAR(255)): User's email address.
 * password (VARCHAR(255)): User's password.
 * created_at (DATETIME): Timestamp of user creation.
 * updated_at (DATETIME): Timestamp of the last user modification.
 *
 */

export async function GET() {
  await sql`
    CREATE TABLE users (
      id INT PRIMARY KEY,
      email VARCHAR(255),
      password VARCHAR(255),
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );
  `;

  return NextResponse.json(
    { message: "Users table created" },
    {
      status: 200,
    },
  );
}
