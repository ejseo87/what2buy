import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // Home page
  index("common/pages/home-page.tsx"),


  // API routes
  ...prefix("/api", [
    route("/stocks", "features/api/pages/stocks-api.tsx"),
    route("/stocks/earnings", "features/api/pages/stock-earnings-api.tsx"),
  ]),

  // History routes
  ...prefix("histories", [
    index("features/histories/pages/histories-page.tsx"),
    // History detail
    route("/:recommendationId", "features/histories/pages/history-page.tsx"),
    // Stock routes
    ...prefix("/stocks", [
      index("features/histories/pages/stocks-page.tsx"),
      route("/:stockCode", "features/histories/pages/stock-page.tsx"),
    ]),
    // Search
    route("search", "features/histories/pages/search-page.tsx"),
  ]),

  // Recommendation request
  ...prefix("/recommendation", [
    index("features/recommendations/pages/recommendation-page.tsx"),
  ]),

  // Ticket details and buy tickets
  ...prefix("/tickets", [
    index("features/tickets/pages/tickets-page.tsx"),
    route("/buy", "features/tickets/pages/buy-tickets-page.tsx"),
  ]),

  //auth
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
      ...prefix("/otp", [
        route("/start", "features/auth/pages/otp-start-page.tsx"),
        route("/complete", "features/auth/pages/otp-complete-page.tsx"),
      ]),
      ...prefix("/social/:provider", [
        route("/start", "features/auth/pages/social-start-page.tsx"),
        route("/complete", "features/auth/pages/social-complete-page.tsx"),
      ]),
    ]),
    route("/logout", "features/auth/pages/logout-page.tsx"),
  ]),

  // User profile route (public)
  ...prefix("/users/:username", [
    index("features/users/pages/profile-page.tsx"),
    route("/welcome", "features/users/pages/welcome-page.tsx"),
  ]),

  //:username
  ...prefix("/my", [
    route("/profile", "features/users/pages/my-profile-page.tsx"),
    route("/settings", "features/users/pages/settings-page.tsx"),
    route("/notifications", "features/users/pages/notifications-page.tsx"),
    route("/support", "features/users/pages/support-page.tsx"),
    route("/terms", "features/users/pages/terms-page.tsx"),
    route("/privacy", "features/users/pages/privacy-page.tsx"),
  ]),
] satisfies RouteConfig;
