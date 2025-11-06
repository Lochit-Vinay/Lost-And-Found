import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Mock user creation - in production, save to database
    const user = {
      id: "user_" + Date.now(),
      name,
      email,
    }

    return NextResponse.json(
      {
        user,
        message: "Account created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ message: "An error occurred during sign up" }, { status: 500 })
  }
}
