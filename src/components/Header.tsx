import { useState } from "react";
import { Menu, X, Globe, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslations();
  const { user, isAuthenticated, logout } = useAuth();

  const languages: Language[] = ['English', 'Hindi', 'Marathi', 'Punjabi', 'Tamil', 'Telugu', 'Gujarati', 'Bengali'];

  const navigation = [
    { name: t('home'), href: "/", current: location.pathname === "/" },
    { name: t('about'), href: "/about", current: location.pathname === "/about" },
    { name: t('services'), href: "/services", current: location.pathname === "/services" },
    { name: t('bookEquipment'), href: "/booking", current: location.pathname === "/booking" },
    { name: t('hireFarmers'), href: "/farmers", current: location.pathname === "/farmers" },
    { name: t('contact'), href: "/contact", current: location.pathname === "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <nav className="hidden md:flex items-center justify-center space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  item.current
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground hover:shadow-sm"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector & User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm border border-border/50">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{language}</span>
                  <ChevronDown className="h-3 w-3 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 bg-background/95 backdrop-blur-sm">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`cursor-pointer ${language === lang ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile or Login Button */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.firstName}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-sm">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="relative overflow-hidden group bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <Link to="/login" className="relative z-10">
                  <span>{t('login')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </Button>
            )}
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
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center space-x-3 mb-3 px-4 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                    </div>
                    <Button 
                      className="w-full mb-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300" 
                      size="sm" 
                      asChild
                    >
                      <Link to="/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full mb-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground" 
                      size="sm" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full mb-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300" 
                    size="sm" 
                    asChild
                  >
                    <Link to="/login">{t('login')}</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent/10 to-secondary/10 backdrop-blur-sm border border-border/50">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{language}</span>
                      <ChevronDown className="h-3 w-3 text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-32 bg-background/95 backdrop-blur-sm">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`cursor-pointer ${language === lang ? 'bg-accent text-accent-foreground' : ''}`}
                      >
                        {lang}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;