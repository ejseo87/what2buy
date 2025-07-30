import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/components/Navigation";
import Footer from "./common/components/footer";
import { Settings } from "luxon";
import { makeSSRClient } from "./supa-client";
import { getUserById } from "./features/users/queries";
import * as Sentry from "@sentry/react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";
  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data: user } = await client.auth.getUser();
  //console.log("root loader user=", user);
  if (user.user) {
    const profile = await getUserById(client as any, { id: user.user?.id });
    return { user, profile };
  }
  return { user: null, profile: null };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const isLoggedIn = loaderData.user !== null;
  //console.log("root app loaderData=", loaderData);
  console.log("root app isLoggedIn=", isLoggedIn);
  
  const isAuthPage = pathname.includes("/auth/");
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && (
        <Navigation
          isLoggedIn={isLoggedIn}
          username={(loaderData.profile as any)?.username ?? ""}
          name={(loaderData.profile as any)?.name ?? ""}
          avatar={(loaderData.profile as any)?.avatar ?? null}
          hasNotifications={false}
          hasMessages={false}
        />
      )}
      
      <main 
        className={
          isAuthPage
            ? "flex-1"
            : "flex-1 py-16 md:py-20 lg:py-28 px-4 md:px-10 lg:px-20"
        }
      >
        <Outlet
          context={{
            isLoggedIn,
            username: (loaderData.profile as any)?.username ?? "",
            name: (loaderData.profile as any)?.name ?? "",
            avatar: (loaderData.profile as any)?.avatar ?? null,
          }}
        />
      </main>
      
      {!isAuthPage && <Footer />}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
    if (error.status !== 404) {
      Sentry.captureException(error);
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    Sentry.captureException(error);
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
