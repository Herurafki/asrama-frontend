import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/sonner";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="homepage dark">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
          <Toaster richColors position="top-center" theme="light" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
