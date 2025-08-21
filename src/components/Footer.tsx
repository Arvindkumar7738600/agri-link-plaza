import { Smartphone, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-lg">KisanSeva Plus</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
              Connecting farmers with agricultural equipment and services across India. 
              Making farming efficient and profitable for everyone.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/booking" className="hover:text-white transition-colors">Tractor Rental</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors">Equipment Rental</Link></li>
              <li><Link to="/farmers" className="hover:text-white transition-colors">Farmer Hiring</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Advisory Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Financial Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Market Linkage</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Report Issue</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Download App</h3>
            <div className="space-y-3">
              <a 
                href="#" 
                className="block bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg p-3 text-center text-sm"
              >
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-semibold">App Store</div>
              </a>
              <a 
                href="#" 
                className="block bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg p-3 text-center text-sm"
              >
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 KisanSeva Plus. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🇮🇳</span>
                <span>Made in India</span>
              </div>
              <span>•</span>
              <span>ISO 9001:2015 Certified</span>
              <span>•</span>
              <span>Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;