import "./globals.css";
import "@code-hike/mdx/dist/index.css";
import { Outfit } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { SquigglyUnderline } from "@/components/ui/squiggly-underline";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "SHUYUAN NOTE",
  description: "A note taking by SHUYUAN.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-TW">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${outfit.className}`}
      >
        <head>
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="c8dac692-49b1-4b92-a953-d102fa42ef56"
          ></script>
        </head>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl px-4 py-10 mx-auto">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <SquigglyUnderline />
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
