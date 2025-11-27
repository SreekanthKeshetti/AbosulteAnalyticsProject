import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Check,
  Menu,
  X,
  Download,
  Phone, // <--- Added
  Mail, // <--- Added
  MapPin, // <--- Added (Fixes your crash)
} from "lucide-react";
import { ShieldCheck, Eye, Target, ScanLine } from "lucide-react";
import MyLogo from "./assets/logo.png";
import { motion } from "framer-motion";

// --- Internal UI Components (Single File Architecture) ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 border border-transparent hover:shadow-purple-500/40",
    ghost:
      "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-slate-600 backdrop-blur-sm",
    outline:
      "bg-transparent border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:border-slate-500",
  };

  return (
    <a className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

const Card = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative h-full rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 backdrop-blur-sm overflow-hidden group transition-all duration-300 ${className}`}
    >
      {hoverEffect && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
        </>
      )}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle, align = "center" }) => (
  <div
    className={`mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } max-w-3xl mx-auto`}
  >
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 mb-4 pb-1">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20 mb-4">
    {children}
  </span>
);

// Framer ANimations
const FadeIn = ({ children, direction = "up", delay = 0, className = "" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8, // Slightly slower for elegance
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      // ADDED: w-full to ensure it fills the grid column properly
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Theme State with Persistence
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // Default to dark
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Theme Change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { name: "Research", href: "#research" },
    { name: "About", href: "#about" },
    { name: "Subscription", href: "#subscription" },
    { name: "Performance", href: "#performance" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];
  // --- Custom Animations for Background ---
  const backgroundStyles = `
    @keyframes roam {
      0% { 
        transform: translate(0px, 0px) scale(1) rotate(0deg); 
      }
      33% { 
        transform: translate(30vw, -20vh) scale(1.5) rotate(90deg); 
      }
      66% { 
        transform: translate(-20vw, 20vh) scale(0.8) rotate(180deg); 
      }
      100% { 
        transform: translate(0px, 0px) scale(1) rotate(360deg); 
      }
    }

    .animate-roam {
      /* 8s duration is much faster than before. 'alternate' makes it bounce back and forth smoothly */
      animation: roam 8s infinite alternate ease-in-out;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }

    @keyframes border-shine {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    
    .animate-border-shine {
      animation: border-shine 4s linear infinite;
    }
  `;

  // Form Handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // <--- Make sure this line exists!
    message: "",
    privacyAgreed: false,
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => setStatus("idle"), 3000); // Clear success message after 3s
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };
  // --- Linear Shine "Marco Glide" Style Button (Premium Interaction) ---
  const ShimmerButton = ({ children, href, className = "" }) => {
    return (
      <a
        href={href}
        className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full p-[1px] 
        transition-all duration-300 ease-out
        hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] 
        active:scale-[0.96] focus:outline-none ${className}`}
      >
        {/* 
         The Moving Shine (Absolute Background)
         - Gradient is bright white
         - Animation speed is smooth
      */}
        <span className="absolute inset-[-100%] bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,1)_45%,#ffffff_50%,rgba(255,255,255,1)_55%,transparent_65%)] bg-[length:200%_100%] animate-border-shine" />

        {/* 
         The Inner Button 
         - Removed 'font-bold', changed to 'font-medium' to match Navbar links.
         - Added 'active:bg-slate-800' for click feedback.
      */}
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors group-hover:bg-slate-900">
          {children}
        </span>
      </a>
    );
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 selection:bg-purple-500/30 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Background Effects */}
      <style>{backgroundStyles}</style>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* LIGHT MODE: Keeps the subtle watercolor look (Blue/Purple) */}
        <div className="dark:hidden absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-300/60 rounded-full mix-blend-multiply filter blur-[80px] animate-roam"></div>
        <div className="dark:hidden absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-300/60 rounded-full mix-blend-multiply filter blur-[80px] animate-roam animation-delay-2000"></div>
        <div className="dark:hidden absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-slate-300/60 rounded-full mix-blend-multiply filter blur-[80px] animate-roam animation-delay-4000"></div>

        {/* DARK MODE: Blue, White, & Deep Indigo Palette */}

        {/* 1. Deep Royal Blue (The main color) */}
        <div className="hidden dark:block absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-800/40 rounded-full mix-blend-screen filter blur-[100px] animate-roam"></div>

        {/* 2. White/Silver Mist (The "White" accent - Low opacity to look like a glow) */}
        <div className="hidden dark:block absolute top-[10%] right-[-20%] w-[50vw] h-[50vw] bg-slate-100/10 rounded-full mix-blend-screen filter blur-[100px] animate-roam animation-delay-2000"></div>

        {/* 3. Electric Indigo (The bridge between black and blue) */}
        <div className="hidden dark:block absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-roam animation-delay-4000"></div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-transparent shadow-sm dark:shadow-none"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white shrink-0">
              <img
                src={MyLogo}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span>Absolute Analytics</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* NEW SHIMMER BUTTON */}
              <ShimmerButton href="#subscription">Get Started</ShimmerButton>
            </div>

            {/* Mobile/Tablet Menu Toggle */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5 z-50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button href="#subscription" className="w-full justify-center mt-2">
              Subscribe Now
            </Button>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-10">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-medium text-purple-600 dark:text-purple-300 mb-8 animate-fade-in-up backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Live Market Analysis
            </div>

            {/* below h1 removed :   text-transparent */}

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-400 animate-fade-in-up [animation-delay:200ms]">
              Absolute Analytics
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Real-time alerts and institutional-grade research for Nifty, Gold,
              Crude, and select equities.{" "}
              <span className="text-slate-900 dark:text-slate-200 font-medium">
                Minimal noise. Maximum edge.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
              <Button href="#subscription" className="w-full sm:w-auto group">
                Subscribe Now — ₹2,999/mo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="#performance"
                variant="ghost"
                className="w-full sm:w-auto"
              >
                View Performance
              </Button>
            </div>
          </div>

          {/* Hero Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 to-transparent opacity-50 blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* Highlights Section */}
        {/* Highlights Section */}
        <section
          id="highlights"
          className="py-12 md:py-24 relative overflow-hidden"
        >
          {/* CONTAINER WRAPPER - This handles the side spacing */}
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading
              title="Built for Serious Traders"
              subtitle="Algorithmic precision plus trader intuition. Liquidity decoys, volume traps, and directional bias — mapped across timeframes."
            />

            {/* Grid Wrapper */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Algorithmic Precision",
                  desc: "Multi-timeframe signals tracking decoys, traps, and bias with volatility filters.",
                  icon: Zap,
                },
                {
                  title: "Deep Research",
                  desc: "Nifty/BankNifty, Gold, Crude and a tight equity universe with long-horizon projections.",
                  icon: BarChart3,
                },
                {
                  title: "Transparent Results",
                  desc: "We publish what we trade — entries, exits, and P&L you can audit.",
                  icon: Shield,
                },
              ].map((item, i) => (
                <FadeIn
                  key={i}
                  direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
                  delay={i * 0.2}
                  className="h-full"
                >
                  <Card className="h-full">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { val: "30D", label: "Window" },
                { val: "PF 1.6+", label: "Profit Factor (sample)" },
                { val: "↑ Expectancy", label: "Risk-adjusted" },
                { val: "DD < 20%", label: "Max Drawdown (target)" },
              ].map((kpi, i) => (
                <Card
                  key={i}
                  className="text-center py-6 px-2 md:px-4 !bg-slate-100/50 dark:!bg-slate-900/30 flex flex-col justify-center items-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
                    {kpi.val}
                  </div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                    {kpi.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        {/* Research Section */}
        <section
          id="research"
          className="py-20 md:py-32 bg-slate-100/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading
              title="Precision Research. Predictive Edge."
              subtitle="Coverage where our edge is repeatable."
            />

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Nifty & BankNifty",
                  desc: "Liquidity flow, OI dynamics, event bias, and decoy traps; scenario planning for the week.",
                },
                {
                  title: "Gold & Crude",
                  desc: "Macro regimes (DXY/rates), structural cycles, and 12–18 month probability paths.",
                },
                {
                  title: "Select Equities",
                  desc: "Accumulation & distribution detection, delivery spikes, breakout confirmations, risk windows.",
                },
              ].map((item, i) => (
                <FadeIn
                  key={i}
                  // Logic: First=Left, Last=Right, Middle=Up
                  direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
                  delay={i * 0.2}
                  className="h-full"
                >
                  <Card className="h-full">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* Button Animation - Simple Fade Up */}
            {/* Button Animation - Simple Fade Up */}
            <FadeIn direction="up" delay={0.6}>
              <div className="mt-12 text-center">
                <Button href="#" variant="ghost" className="group">
                  Download Sample Report
                  {/* Icon moves down slightly on hover for a 'download' effect */}
                  <Download className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* About Section */}
        {/* py-20 md:py-32 to py-12 md:py-24 */}
        <section id="about" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text: Slides in from LEFT */}
              <FadeIn direction="left">
                <div>
                  <Badge>About Us</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                    The 8th Sense of the Markets
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Founded by{" "}
                    <strong className="text-slate-900 dark:text-white">
                      Karthik Shabarinadh
                    </strong>
                    , Absolute Analytics operates at the intersection of
                    quantitative precision and trader intuition.
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Markets move on liquidity, psychology and timing — not
                    noise. Our mission: give serious traders a durable edge
                    before the crowd reacts.
                  </p>
                </div>
              </FadeIn>

              {/* Grid: Slides in from RIGHT */}
              <FadeIn direction="right" delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Integrity",
                      desc: "Truthful numbers and an audited process.",
                      icon: ShieldCheck,
                    },
                    {
                      title: "Clarity",
                      desc: "Fewer calls, higher quality.",
                      icon: Eye,
                    },
                    {
                      title: "Discipline",
                      desc: "Rule-based execution and reviews.",
                      icon: Target,
                    },
                    {
                      title: "Transparency",
                      desc: "We publish what we trade.",
                      icon: ScanLine,
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="p-6 rounded-xl bg-white/50 dark:bg-slate-800/30
                border border-slate-200 dark:border-slate-700/50
                hover:bg-white dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-3" />
                        <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section
          id="subscription"
          // changing py-20 md:py-32 to py-12 md:py-24
          className="py-12 md:py-24 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -z-10" />

          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading
              title="Choose Your Edge"
              subtitle="Flexible plans for serious traders."
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Monthly Plan */}
              <FadeIn direction="up" delay={0}>
                <Card className="flex flex-col items-start relative overflow-hidden !bg-white/80 dark:!bg-slate-900/80">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp className="w-24 h-24 text-slate-900 dark:text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium mb-6">
                    Monthly
                  </span>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      ₹2,999
                    </span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Realtime alerts, weekly reports, model updates, email
                    access.
                  </p>
                  <ul className="space-y-3 mb-8 w-full">
                    {[
                      "Realtime Alerts",
                      "Weekly Reports",
                      "Model Updates",
                      "Email Access",
                    ].map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <Check className="w-4 h-4 text-purple-500" /> {feat}
                      </li>
                    ))}
                  </ul>
                  <Button href="#" variant="outline" className="w-full mt-auto">
                    Subscribe Monthly
                  </Button>
                </Card>
              </FadeIn>

              {/* Annual Plan */}
              <FadeIn direction="up" delay={0.2}>
                <Card className="flex flex-col items-start relative overflow-hidden border-purple-500/30 !bg-white/80 dark:!bg-slate-900/80 shadow-2xl shadow-purple-900/10 dark:shadow-purple-900/20">
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    POPULAR
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-medium mb-6 border border-purple-200 dark:border-purple-500/20">
                    Save 20%
                  </span>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      ₹28,790
                    </span>
                    <span className="text-slate-500">/yr</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                    All Monthly features + priority support + early model
                    access.
                  </p>
                  <ul className="space-y-3 mb-8 w-full">
                    {[
                      "All Monthly Features",
                      "Priority Support",
                      "Early Model Access",
                      "1-on-1 Onboarding",
                    ].map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <div className="p-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20">
                          <Check className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button href="#" variant="primary" className="w-full mt-auto">
                    Subscribe Yearly
                  </Button>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section
          id="performance"
          className="py-20 md:py-32 bg-slate-100/50 dark:bg-slate-900/30"
        >
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading
              title="We Publish What We Trade"
              subtitle="Transparent weekly reports with entries, exits, P&L, accuracy and risk-adjusted returns."
            />

            <Card className="max-w-5xl mx-auto overflow-hidden">
              {/* KPI Row */}
              {/* KPI Row */}
              {/* CHANGED: md:grid-cols-4 TO lg:grid-cols-4 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8 px-4">
                {[
                  {
                    val: "+230 pts",
                    label: "Best Recent NIFTY Trade",
                    color: "text-emerald-600 dark:text-emerald-400",
                  },
                  {
                    val: "64%",
                    label: "Win Rate (sample)",
                    color: "text-slate-900 dark:text-white",
                  },
                  {
                    val: "1.58",
                    label: "Profit Factor (sample)",
                    color: "text-slate-900 dark:text-white",
                  },
                  {
                    val: "<20%",
                    label: "Max Drawdown (target)",
                    color: "text-slate-900 dark:text-white",
                  },
                ].map((kpi, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={`text-2xl md:text-3xl font-bold mb-1 ${kpi.color}`}
                    >
                      {kpi.val}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide px-2">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 tracking-wider">
                      <th className="py-4 px-4 font-medium">Date</th>
                      <th className="py-4 px-4 font-medium">Asset</th>
                      <th className="py-4 px-4 font-medium">Direction</th>
                      <th className="py-4 px-4 font-medium">Entry</th>
                      <th className="py-4 px-4 font-medium">Exit</th>
                      <th className="py-4 px-4 font-medium">P&L</th>
                      <th className="py-4 px-4 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700 dark:text-slate-300">
                    {[
                      {
                        date: "14 Oct 2025",
                        asset: "NIFTY",
                        dir: "Long",
                        entry: "22,510",
                        exit: "22,740",
                        pnl: "+230 pts",
                        note: "Breakout confirmation",
                        pnlColor: "text-emerald-600 dark:text-emerald-400",
                      },
                      {
                        date: "15 Oct 2025",
                        asset: "RELIANCE",
                        dir: "Long",
                        entry: "2,885",
                        exit: "2,928",
                        pnl: "+43 pts",
                        note: "Volume bias continuation",
                        pnlColor: "text-emerald-600 dark:text-emerald-400",
                      },
                      {
                        date: "16 Oct 2025",
                        asset: "GOLD",
                        dir: "Long",
                        entry: "72,880",
                        exit: "73,450",
                        pnl: "+570 pts",
                        note: "Dollar correlation play",
                        pnlColor: "text-emerald-600 dark:text-emerald-400",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-4 px-4">{row.date}</td>
                        <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">
                          {row.asset}
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                            {row.dir}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-500 dark:text-slate-400">
                          {row.entry}
                        </td>
                        <td className="py-4 px-4 font-mono text-slate-500 dark:text-slate-400">
                          {row.exit}
                        </td>
                        <td className={`py-4 px-4 font-bold ${row.pnlColor}`}>
                          {row.pnl}
                        </td>
                        <td className="py-4 px-4 text-slate-500 italic">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-xs text-slate-500 dark:text-slate-600 text-center">
                Note: Results shown for illustration. Past performance is not
                indicative of future results.
              </p>
            </Card>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading title="Insights That Outlast News" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Liquidity Decoys > Lagging Indicators",
                  desc: "Why order-flow traps often predate headline moves.",
                  date: "Oct 12, 2025",
                },
                {
                  title: "Nifty’s Silent Triggers",
                  desc: "The microstructure tells before the breakout.",
                  date: "Oct 08, 2025",
                },
                {
                  title: "Gold’s Next 12 Months",
                  desc: "Rate regimes, currency decay, and path probabilities.",
                  date: "Sep 28, 2025",
                },
              ].map((post, i) => (
                <a key={i} href="#" className="group block">
                  <Card className="h-full hover:border-purple-500/40 transition-colors">
                    <div className="text-xs text-purple-600 dark:text-purple-400 mb-3 font-medium">
                      {post.date}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {post.desc}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Read Article <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 md:py-32 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/50 relative overflow-hidden"
        >
          {/* Decorative Blur behind the form */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* LEFT COLUMN: Contact Information */}
              <FadeIn direction="right" className="space-y-10">
                <div>
                  <Badge>Contact Us</Badge>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Get in{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      Touch
                    </span>
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                    Have questions about our models or subscription plans? We
                    are here to help you gain your edge.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Office Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-purple-600 dark:text-purple-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Office
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Financial District, Nanakramguda
                        <br />
                        Hyderabad, Telangana 500032
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-purple-600 dark:text-purple-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:support@absoluteanalytics.com"
                        className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        support@absoluteanalytics.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-purple-600 dark:text-purple-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        Phone
                      </h4>
                      <a
                        href="tel:+919876543210"
                        className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        +91 98765 43210
                      </a>
                      <p className="text-xs text-slate-500 mt-1">
                        Mon-Fri, 9am - 6pm IST
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* RIGHT COLUMN: Form */}
              <FadeIn direction="left" delay={0.2}>
                <Card className="!bg-white/80 dark:!bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Phone Field (New) */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="How can we help you?"
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none placeholder:text-slate-400"
                        required
                      ></textarea>
                    </div>

                    {/* Privacy Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          name="privacyAgreed"
                          id="privacyAgreed"
                          checked={formData.privacyAgreed}
                          onChange={handleInputChange}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 transition-all checked:border-purple-500 checked:bg-purple-500 hover:border-purple-400"
                          required
                        />
                        <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <label
                        htmlFor="privacyAgreed"
                        className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none leading-tight"
                      >
                        By submitting this form, you agree to our{" "}
                        <a
                          href="#"
                          className="text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and consent to being contacted.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="w-full inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                      >
                        {status === "loading" ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : status === "success" ? (
                          <span className="flex items-center gap-2">
                            <Check className="w-5 h-5" /> Message Sent
                            Successfully
                          </span>
                        ) : status === "error" ? (
                          "Failed. Try Again."
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* Footer */}
      {/* CHANGED BACKGROUND: Matches Contact Section (slate-100/50 and slate-900/30) */}
      <footer className="bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/50 pt-16 pb-12 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: About / Branding */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-black dark:text-white tracking-tight">
              Absolute Analytics
            </h3>
            <p className="text-sm font-bold leading-relaxed text-black dark:text-slate-400 max-w-sm">
              Real-time alerts and institutional-grade research for Nifty, Gold,
              Crude, and select equities. Minimal noise. Maximum edge.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-black dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-bold">
              {[
                { name: "Research", href: "#research" },
                { name: "About", href: "#about" },
                { name: "Subscription", href: "#subscription" },
                { name: "Performance", href: "#performance" },
                { name: "Blog", href: "#blog" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-black hover:text-purple-700 hover:underline decoration-2 underline-offset-4 dark:text-slate-300 dark:hover:text-purple-400 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal / Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-black dark:text-white">
              Legal & Contact
            </h4>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-black hover:text-purple-700 hover:underline decoration-2 underline-offset-4 dark:text-slate-300 dark:hover:text-purple-400 transition-all"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-black hover:text-purple-700 hover:underline decoration-2 underline-offset-4 dark:text-slate-300 dark:hover:text-purple-400 transition-all"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:support@absoluteanalytics.com"
                  className="flex items-center gap-2 text-black hover:text-purple-700 dark:text-white dark:hover:text-purple-400 transition-colors font-extrabold"
                >
                  support@absoluteanalytics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-800/50 text-center">
          <p className="text-xs font-bold text-black dark:text-slate-500">
            © {new Date().getFullYear()} Absolute Analytics. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
