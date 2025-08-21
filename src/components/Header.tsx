import { useState } from "react";
import { Menu, X, Tractor, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    { name: "About", href: "/about", current: location.pathname === "/about" },
    { name: "Services", href: "/services", current: location.pathname === "/services" },
    { name: "Book Equipment", href: "/booking", current: location.pathname === "/booking" },
    { name: "Hire Farmers", href: "/farmers", current: location.pathname === "/farmers" },
    { name: "Contact", href: "/contact", current: location.pathname === "/contact" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/7c821560-56eb-4079-8f44-e64f31f694dd.png" 
              alt="KisanSeva Plus Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-end space-x-6 pb-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative transition-all duration-300 group ${
                  item.name === "Hire Farmers"
                    ? `px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
                        item.current
                          ? "bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-green-500/30 hover:scale-105"
                      }`
                    : `text-sm font-medium transition-colors hover:text-primary ${
                        item.current
                          ? "text-primary border-b-2 border-primary pb-1"
                          : "text-muted-foreground"
                      }`
                }`}
              >
                <span className={item.name === "Hire Farmers" ? "relative z-10" : ""}>{item.name}</span>
                {item.name === "Hire Farmers" && (
                  <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Login */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm border border-border/50">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">+91 9608792602</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="relative overflow-hidden group bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <Link to="/login" className="relative z-10">
                <span>Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-3 mx-2 text-sm font-semibold rounded-lg transition-all duration-300 overflow-hidden group ${
                    item.current
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:shadow-lg hover:shadow-primary/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              ))}
              <div className="pt-4 mx-2 border-t border-border/50">
                <Button 
                  className="w-full mb-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300" 
                  size="sm" 
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm border border-border/50">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">+91 9608792602</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;