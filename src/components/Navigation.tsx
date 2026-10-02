import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ChevronDown, Settings, Flame, Box, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { productCategories } from '@/data/products';
import aimsLogo from '@/assets/aims-logo.png';

const CATEGORY_ICONS = { analyzer: Settings, heattracing: Flame, shelter: Box } as const;

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const navLinkClass = (active: boolean) =>
  `px-3.5 py-2 text-[14px] whitespace-nowrap transition-colors duration-200 ${
    active ? 'text-primary font-bold' : 'text-foreground/70 font-semibold hover:text-primary'
  }`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-elevated' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[88px]">
          <Link to="/" className="flex items-center gap-3.5 group">
            <img
              src={aimsLogo}
              alt="AIMS"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-extrabold text-xl xl:text-2xl leading-tight tracking-tight whitespace-nowrap">
              <span className="text-primary">AIMS</span> <span className="text-accent">Manufacturing</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
              Home
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className={`flex items-center gap-1 ${navLinkClass(false)} outline-none`}>
                  Products <ChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={14}
                className="w-64 p-2 rounded-xl border-border shadow-elevated"
              >
                <DropdownMenuItem asChild className="focus:bg-transparent">
                  <Link
                    to="/products"
                    className="flex items-center px-3 py-2.5 rounded-lg text-sm font-bold text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
                  >
                    All Products
                  </Link>
                </DropdownMenuItem>

                <div className="h-px bg-border my-1.5 mx-1" />

                {productCategories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id];
                  return (
                    <DropdownMenuItem key={cat.id} asChild className="focus:bg-transparent">
                      <Link
                        to={`/products?category=${cat.id}`}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors duration-200 cursor-pointer"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                          <Icon size={15} />
                        </span>
                        {cat.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuItem asChild className="focus:bg-transparent">
                  <Link
                    to="/products?category=spareparts"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted/70 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                      <Wrench size={15} />
                    </span>
                    Spare Parts
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => navLinkClass(isActive)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+97126436114"
              className="hidden xl:flex items-center gap-2 text-[13px] font-semibold text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
            >
              <Phone size={14} className="text-primary flex-shrink-0" />
              +971 2 643 6114
            </a>
            <Link to="/contact">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent text-white border-0 rounded-full px-6 shadow-glow hover:shadow-hero hover:scale-[1.03] transition-all duration-300 whitespace-nowrap"
              >
                Request Quote <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-foreground transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="h-[3px] bg-gradient-to-r from-primary to-accent" />

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground/80'}`}
            >
              Home
            </NavLink>

            <button
              type="button"
              onClick={() => setMobileProductsOpen((o) => !o)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/80"
            >
              Products
              <ChevronDown size={15} className={`transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <div className="ml-4 mt-1 mb-1 space-y-1 border-l-2 border-primary/20 pl-4 animate-fade-up">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/products');
                  }}
                  className="block w-full text-left py-1.5 text-sm font-semibold text-primary"
                >
                  All Products
                </button>
                {productCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate(`/products?category=${cat.id}`);
                    }}
                    className="block w-full text-left py-1.5 text-sm text-foreground/70"
                  >
                    {cat.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/products?category=spareparts');
                  }}
                  className="block w-full text-left py-1.5 text-sm text-foreground/70"
                >
                  Spare Parts
                </button>
              </div>
            )}

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `px-4 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground/80'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2">
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 rounded-full shadow-glow">
                Request Quote <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
