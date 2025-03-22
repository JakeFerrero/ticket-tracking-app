import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ticket Tracking App',
  description: 'A simple ticket tracking application'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
