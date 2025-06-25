import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // Home page
  index("common/pages/home-page.tsx"),

  // History routes
  ...prefix("histories", [
    index("features/histories/pages/histories-redirect-page.tsx"),
    // Latest recommendations
    route("latests", "features/histories/pages/latests-page.tsx"),
    // All recommendations
    route("all", "features/histories/pages/histories-page.tsx"),
    // History detail
    route(
      "/:recommendationId",
      "features/histories/pages/history-detail-page.tsx"
    ),
    // Stock routes
    ...prefix("stocks", [
      index("features/histories/pages/stocks-page.tsx"),
      route("/:stockId", "features/histories/pages/stock-detail-page.tsx"),
    ]),
    // Search
    route("search", "features/histories/pages/search-page.tsx"),
  ]),

  // Recommendation request
  route(
    "recommendation",
    "features/recommendations/pages/recommendation-page.tsx"
  ),

  // User routes
  ...prefix("users", [
    index("features/users/pages/users-page.tsx"),
    // Auth routes
    route("login", "features/users/pages/login-page.tsx"),
    route("join", "features/users/pages/join-page.tsx"),
    ...prefix(":userId", [
      index("features/users/pages/user-profile-page.tsx"),
      route("edit", "features/users/pages/edit-profile-page.tsx"),
      route("change-password", "features/users/pages/change-password-page.tsx"),
      route("logout", "features/users/pages/logout-page.tsx"),
      ...prefix("tickets", [
        index("features/users/pages/tickets-page.tsx"),
        route("buy", "features/users/pages/buy-tickets-page.tsx"),
      ]),
    ]),
  ]),

  // Manual/Help
  route("manual", "features/supports/pages/manual-page.tsx"),
  // Statistics
  route("stat", "features/supports/pages/statistics-page.tsx"),
  // Settings
  route("settings", "features/supports/pages/settings-page.tsx"),
  // Support
  route("support", "features/supports/pages/support-page.tsx"),
] satisfies RouteConfig;
