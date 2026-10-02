import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <div className="flex-1 flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page not found.</p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Back to Home <ArrowRight size={15} className="ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
