import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    //  analytics('prj_gEWk9eqBuUwWvAfv2No0u7dTwv5g');
  return (
    <html lang="en">
       <body className={`${inter.className} antialiased`}>{children}
       <Analytics /></body>
    </html>
  );
}
  