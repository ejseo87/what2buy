import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://de1b5d30815bbba9add54b8aedc36356@o4509735967850496.ingest.us.sentry.io/4509736006516736",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
