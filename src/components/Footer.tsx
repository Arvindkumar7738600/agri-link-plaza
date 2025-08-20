import { Tractor, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/7c821560-56eb-4079-8f44-e64f31f694dd.png" 
                alt="KisanSeva Plus Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm opacity-90 mb-4 max-w-md">
              Empowering farmers with technology. Connect with equipment owners, 
              hire skilled farmers, and access agricultural services all in one platform.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <a 
                href="https://www.instagram.com/thee_motivational/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity"
              >
                <Instagram className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/booking" className="hover:opacity-100 transition-opacity">Book Equipment</Link></li>
              <li><Link to="/farmers" className="hover:opacity-100 transition-opacity">Hire Farmers</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 9608792602</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:info.Kisansevaplus@gmail.com" 
                  className="hover:opacity-100 transition-opacity"
                >
                  info.Kisansevaplus@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>KisanSeva Plus Complex,<br />Ranchi, Jharkhand 834002</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2024 KisanSeva Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;