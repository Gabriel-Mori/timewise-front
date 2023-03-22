import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props extends AppProps {
  defaultTheme: "light" | "dark";
  user: {
    name: string;
    picture?: {
      bytes?: string;
      mimeType?: string;
    };
  };
}
export default function App({
  Component,
  pageProps,
  defaultTheme,
  user,
}: Props) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} />
    </ThemeProvider>
  );
}
