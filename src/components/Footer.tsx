import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Global Sportsbook Hub</h3>
            <p className="text-slate-400 mb-4">
              Global Sportsbook Hub is your comprehensive directory for comparing and analyzing online sportsbooks worldwide. 
              We provide detailed traffic insights, user demographics, and in-depth reviews to help you make informed decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#top-sportsbooks" className="hover:text-primary transition-colors">
                  Top Sportsbooks
                </a>
              </li>
              <li>
                <a href="#traffic-analysis" className="hover:text-primary transition-colors">
                  Traffic Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
            <ul className="space-y-2 text-slate-400">
              <li>✓ Real-time traffic data</li>
              <li>✓ Comprehensive sportsbook reviews</li>
              <li>✓ Global market insights</li>
              <li>✓ User-friendly comparison tools</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Global Sportsbook Hub. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Helping users make informed decisions in the online betting industry.
          </p>
        </div>
      </div>
    </footer>
  );
}
