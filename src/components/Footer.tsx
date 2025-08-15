import { Tractor, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-foreground p-2 rounded-lg">
                <Tractor className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">KisanSeva Plus</span>
                <span className="text-sm opacity-90">Connecting Agriculture</span>
              </div>
            </Link>
            <p className="text-sm opacity-90 mb-4 max-w-md">
              Empowering farmers with technology. Connect with equipment owners, 
              hire skilled farmers, and access agricultural services all in one platform.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Instagram className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
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
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@kisansevaplus.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Agriculture Hub,<br />New Delhi, India 110001</span>
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