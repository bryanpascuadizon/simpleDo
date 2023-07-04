import Providers from "@/utils/provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SimpleDo",
  description: "Stay Organized. Get it Done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="bg-white text-blueGrey-600 m-auto max-w-md p-5 h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
