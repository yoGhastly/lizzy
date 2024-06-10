import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/*
   -   id (INT PRIMARY KEY): Unique identifier for each cart.
   -   user_id (INT FOREIGN KEY REFERENCES Users(id)): Links the cart to a specific user (optional for guest carts).
   -   session_id (VARCHAR(255)): Unique identifier for the user's session (used for guest carts).
   -   created_at (DATETIME): Timestamp of cart creation.
   -   updated_at (DATETIME): Timestamp of the last cart modification.
 */

export async function GET() {
  await sql`
    CREATE TABLE carts (
      id INT PRIMARY KEY,
      user_id INT REFERENCES Users(id),
      session_id VARCHAR(255),
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );
  `;

  return NextResponse.json(
    { message: "Carts table created" },
    {
      status: 200,
    },
  );
}
