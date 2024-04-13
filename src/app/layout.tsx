import { oswald, kanit, kreon } from '@/app/fonts';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${kanit.variable} ${kreon.variable} body`}>{children}</body>
    </html>
  );
}
