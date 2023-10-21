export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"],
};

// Note: If `id:` at end of URL, use +: /issues/edit/id:+
