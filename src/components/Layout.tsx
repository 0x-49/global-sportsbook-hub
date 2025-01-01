import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              ApexSportsbooks
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link to="/compare" className="text-sm font-medium hover:text-primary">
                Compare
              </Link>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </nav>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ApexSportsbooks</h3>
              <p className="text-sm text-gray-600">
                Your trusted source for comprehensive sportsbook reviews and analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="text-sm text-gray-600 hover:text-primary">
                    Compare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-sm text-gray-600 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-sm text-gray-600 hover:text-primary">
                    Betting Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-gray-600 hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-600 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-sm text-gray-600 hover:text-primary">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} ApexSportsbooks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
