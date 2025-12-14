
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/sonner";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navigation />
        <main className="grow w-full ">         
            {children}
          <Toaster richColors position="top-center" theme="light" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
