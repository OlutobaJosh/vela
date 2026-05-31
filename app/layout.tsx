import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vela Analytics — E-commerce Intelligence',
  description: 'Real-time e-commerce analytics. Track revenue, orders, and customers with clarity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
