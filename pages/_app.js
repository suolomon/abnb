import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { ThemeProvider } from "next-themes";

const progress = new ProgressBar({
  size: 4,
  color: "#fD5B61",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
