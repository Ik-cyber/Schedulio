import { withAuth } from "next-auth/middleware";

// This creates the actual middleware function
export default withAuth({
  pages: {
    signIn: "/login", // redirect to /login if not authenticated
  },
});

export const config = {
  matcher: [
    "/(dashboard)/:path*", // protect everything under /dashboard
  ],
};
