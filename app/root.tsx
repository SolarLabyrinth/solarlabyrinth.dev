import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./tailwind.css";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const isDev = (() => {
    try {
      return new URL(request.url).hostname === "localhost";
    } catch {
      return false;
    }
  })();

  return { isDev };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDev } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {isDev && (
          <>
            <ScrollRestoration />
            <Scripts />
          </>
        )}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
