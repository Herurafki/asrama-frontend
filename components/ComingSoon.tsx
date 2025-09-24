import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  pageTitle: string;
}

export const ComingSoon = ({ title, description, pageTitle }: ComingSoonProps) => {
  return (
    <Layout title={`${pageTitle} - Asrama Nurul Hikmah`} description={description}>
      <section className="py-16 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-card">
              <CardContent className="p-12">
                <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {description}
                </p>
                
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Halaman ini sedang dalam tahap pengembangan dan akan segera tersedia.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="default" asChild>
                      <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Beranda
                      </Link>
                    </Button>
                    
                    <Button variant="outline" asChild>
                      <a 
                        href={`https://wa.me/${'+62 812-3456-7890'.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hubungi Kami
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};