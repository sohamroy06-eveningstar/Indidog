import "./globals.css";
import Navbar from "@/components/Navbar";





export const metadata = {
  title: "IndiDog",
  description: "Indian Dog Care Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}