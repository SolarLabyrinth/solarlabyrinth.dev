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
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";

const fonts: string[] = [
  // "/fonts/ComicNeue/ComicNeue-LightItalic.ttf",
  // "/fonts/ComicNeue/ComicNeue-Italic.ttf",
  // "/fonts/ComicNeue/ComicNeue-BoldItalic.ttf",
  // "/fonts/ComicNeue/ComicNeue-Light.ttf",
  "/fonts/ComicNeue/ComicNeue-Regular.ttf",
  "/fonts/ComicNeue/ComicNeue-Bold.ttf",
];

export const links: LinksFunction = () => {
  return fonts.map((href) => ({ rel: "preload", href, as: "font" }));
};

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
