import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider, Header } from "@components/global";
import { GradesProvider } from "@context/GradesContext";

export const metadata: Metadata = {
  title: "Yu Grades",
  description: "No shenanigans, just your grades out of 100!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GradesProvider>
            <Header />
            {children}
          </GradesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
