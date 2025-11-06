import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - in production, verify against a database
    const user = {
      id: "user_" + Date.now(),
      email,
      name: email.split("@")[0],
    }

    return NextResponse.json(
      {
        user,
        message: "Signed in successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ message: "An error occurred during sign in" }, { status: 500 })
  }
}
