import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { id: 1, name: "Skolan", lat: 59.3, lng: 18.1 },
    { id: 2, name: "Biblioteket", lat: 59.4, lng: 18.05 },
  ]
  return NextResponse.json(data);
}