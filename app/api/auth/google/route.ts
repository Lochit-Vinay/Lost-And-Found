import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const mode = request.nextUrl.searchParams.get("mode") || "signin"

    // In production, implement actual Google OAuth flow
    // For now, create a mock user from Google
    const mockUser = {
      id: "google_" + Date.now(),
      name: "Google User",
      email: "user@gmail.com",
      provider: "google",
    }

    // Redirect to dashboard with user data
    const response = NextResponse.redirect(new URL("/dashboard", request.url))
    response.cookies.set("user", JSON.stringify(mockUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.redirect(new URL("/auth?error=google_auth_failed", request.url))
  }
}
