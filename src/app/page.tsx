"use client";

import { useState, useEffect } from "react";

const translations = {
  en: {
    title: "Turn Surplus Into",
    titleSecond: "Savings",
    subtitle: "Buy fresh food at a discount. Help reduce waste. Save money.",
    paragraph1:
      "Growing up in Pakistan, we saw the paradox: perfectly good food being thrown away while many struggle with food affordability. That's why we're building a market-driven solution that connects restaurants, bakeries, and hotels with consumers who want fresh food at a discount.",
    paragraph2:
      "Coming soon to your phone. Be the first to know when we launch.",
    searchPlaceholder: "Search restaurants...",
    nearYou: "Near You",
    pickupToday: "Pickup Today",
    availableNow: "Available Now",
  },
  ur: {
    title: "اضافی کو بچت میں",
    titleSecond: "تبدیل کریں",
    subtitle:
      "تازہ کھانا رعایت پر خریدیں۔ فضلہ کم کرنے میں مدد کریں۔ پیسے بچائیں۔",
    paragraph1:
      "پاکستان میں بڑے ہوتے ہوئے، ہم نے تضاد دیکھا: بالکل اچھا کھانا پھینک دیا جا رہا تھا جبکہ بہت سے لوگ کھانے کی قابلیت خریداری سے جدوجہد کر رہے تھے۔ اسی لیے ہم ایک مارکیٹ پر مبنی حل بنا رہے ہیں جو ریستوراں، بیکریوں اور ہوٹلوں کو ان صارفین سے جوڑتا ہے جو رعایت پر تازہ کھانا چاہتے ہیں۔",
    paragraph2:
      "جلد ہی آپ کے فون پر آ رہا ہے۔ جب ہم لانچ کریں تو سب سے پہلے جانیں۔",
    searchPlaceholder: "ریستوراں تلاش کریں...",
    nearYou: "آپ کے قریب",
    pickupToday: "آج پک اپ",
    availableNow: "ابھی دستیاب",
  },
};

// Logo Component
const Logo = ({
  className = "",
  textColor = "white",
}: {
  className?: string;
  textColor?: string;
}) => {
  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
      {/* Icon: Leaf + Plate symbolizing fresh food and sustainability */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Plate */}
          <circle
            cx="20"
            cy="22"
            r="14"
            stroke={textColor}
            strokeWidth="2.5"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx="20"
            cy="22"
            r="10"
            stroke={textColor}
            strokeWidth="2"
            fill="none"
          />

          {/* Leaf */}
          <path
            d="M20 8 C20 8, 28 10, 28 18 C28 22, 25 25, 20 25 C20 25, 20 8, 20 8 Z"
            fill={textColor}
            opacity="0.9"
          />
          <path
            d="M20 12 Q24 14, 24 18"
            stroke={textColor}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="text-2xl  font-bold tracking-tight"
          style={{ color: textColor }}
        >
          LeftNotOver
        </span>
        <span
          className="hidden sm:block text-[10px] tracking-wider opacity-80"
          style={{ color: textColor }}
        >
          FRESH • AFFORDABLE • SUSTAINABLE
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const t = translations[language];

  // Header scroll state
  const [isScrolled, setIsScrolled] = useState(false);

  // Newsletter / subscription state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubscribe() {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — we've recorded your interest.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data?.error || "Subscription failed.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  }

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #066f6c, #054945, #066f6c)",
      }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? "#f9f3f1" : "transparent",
          borderBottom: isScrolled
            ? "1px solid #e0d5d0"
            : "0.1px solid #f9f3f1",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Company Logo */}
            <Logo textColor={isScrolled ? "#066f6c" : "white"} />

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  language === "en"
                    ? isScrolled
                      ? "bg-[#066f6c] text-white shadow-lg"
                      : "bg-white text-[#066f6c] shadow-lg"
                    : isScrolled
                      ? "text-[#066f6c]/80 hover:text-[#066f6c] hover:bg-[#066f6c]/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  language === "ur"
                    ? isScrolled
                      ? "bg-[#066f6c] text-white shadow-lg"
                      : "bg-white text-[#066f6c] shadow-lg"
                    : isScrolled
                      ? "text-[#066f6c]/80 hover:text-[#066f6c] hover:bg-[#066f6c]/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8 z-10 w-full animate-fade-in">
            <h1
              className={`text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[1.1] text-white tracking-tight ${
                language === "ur" ? "font-urdu" : "font-inter"
              }`}
              dir={language === "ur" ? "rtl" : "ltr"}
            >
              {t.title}
              <span className="block mt-4" style={{ color: "#99d4d0" }}>
                {t.titleSecond}
              </span>
            </h1>
            <p
              className={`text-xl sm:text-2xl lg:text-3xl font-medium max-w-full mx-auto lg:mx-0 leading-relaxed ${
                language === "ur" ? "font-urdu" : "font-inter"
              }`}
              dir={language === "ur" ? "rtl" : "ltr"}
              style={{ color: "#e0f7f6" }}
            >
              {t.subtitle}
            </p>

            {/* Stats/Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#ffffff" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-white font-medium ${
                    language === "ur" ? "font-urdu" : "font-inter"
                  }`}
                  dir={language === "ur" ? "rtl" : "ltr"}
                >
                  {language === "ur" ? "جلد آرہا ہے" : "Coming Soon"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#ffffff" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-white font-medium ${
                    language === "ur" ? "font-urdu" : "font-inter"
                  }`}
                  dir={language === "ur" ? "rtl" : "ltr"}
                >
                  {language === "ur" ? "تازہ کھانا" : "Fresh Food"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <svg
                  className="w-5 h-5"
                  style={{ color: "#ffffff" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-white font-medium ${
                    language === "ur" ? "font-urdu" : "font-inter"
                  }`}
                  dir={language === "ur" ? "rtl" : "ltr"}
                >
                  {language === "ur" ? "بچت" : "Save Money"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Mobile App Mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative phone-float">
              {/* Phone shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-20 bg-black/30 rounded-full blur-2xl"></div>

              {/* Phone Mockup */}
              <div className="relative w-80 h-[650px] lg:w-88 lg:h-[720px] mx-auto">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-[3rem] shadow-2xl border-8 border-gray-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                  {/* Screen */}
                  <div className="absolute inset-x-2 top-2 bottom-2 bg-white rounded-[2.5rem] overflow-hidden">
                    {/* App Status Bar */}
                    <div className="h-12 bg-white flex items-center justify-between px-6 pt-2">
                      <span className="text-xs font-semibold text-gray-900">
                        9:41
                      </span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        <svg
                          className="w-3 h-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="w-5 h-3 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 24 12"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="18"
                            height="12"
                            rx="2"
                            fill="currentColor"
                            opacity="0.3"
                          />
                          <rect
                            x="0"
                            y="0"
                            width="14"
                            height="12"
                            rx="2"
                            fill="currentColor"
                          />
                          <rect
                            x="19"
                            y="4"
                            width="2"
                            height="4"
                            rx="0.5"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* App Header */}
                    <div
                      className="h-16 flex items-center justify-between px-4 shadow-md"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #066f6c, #054945)",
                      }}
                    >
                      <Logo className="scale-75" textColor="white" />
                      <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/10 rounded-full transition">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* App Content - Professional Marketplace */}
                    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
                      {/* Location & Filter Bar */}
                      <div className="bg-white px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-[#2d5f3f]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">
                              Lahore, Pakistan
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none flex-1"
                          />
                        </div>
                      </div>

                      {/* Quick Filters */}
                      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
                        <button
                          className="px-4 py-2 text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-sm"
                          style={{ backgroundColor: "#066f6c" }}
                        >
                          {t.availableNow}
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 text-xs font-semibold rounded-full whitespace-nowrap border border-gray-200">
                          {t.nearYou}
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 text-xs font-semibold rounded-full whitespace-nowrap border border-gray-200">
                          {t.pickupToday}
                        </button>
                      </div>

                      {/* Section Header */}
                      <div className="px-4 pt-4 pb-2">
                        <h2 className="text-lg font-bold text-gray-900">
                          Ending Soon
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Grab these deals before they're gone
                        </p>
                      </div>

                      {/* Marketplace Cards - More Professional */}
                      <div className="px-4 pb-4 space-y-3">
                        {/* Card 1 - Bakery */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
                          <div className="flex gap-3 p-3">
                            {/* Food Image */}
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-orange-400 opacity-50"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                              </div>
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow">
                                -60%
                              </div>
                              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                2h left
                              </div>
                            </div>

                            {/* Card Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-bold text-gray-900 truncate">
                                    Sweet Dreams Bakery
                                  </h3>
                                  <p className="text-xs text-gray-500 truncate mt-0.5">
                                    Mixed Pastries & Fresh Breads
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                  <svg
                                    className="w-3.5 h-3.5 text-amber-500 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-xs font-bold text-gray-900">
                                    4.8
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  0.8 km
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Pickup: 6-8 PM
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-[#2d5f3f]">
                                    Rs 200
                                  </span>
                                  <span className="text-xs text-gray-400 line-through">
                                    Rs 500
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 2 - Restaurant */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
                          <div className="flex gap-3 p-3">
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-red-100 via-pink-100 to-red-200">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 text-red-400 opacity-50"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow">
                                -45%
                              </div>
                              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                1h left
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-bold text-gray-900 truncate">
                                    Spice Route
                                  </h3>
                                  <p className="text-xs text-gray-500 truncate mt-0.5">
                                    Curry & Rice Combo
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                  <svg
                                    className="w-3.5 h-3.5 text-amber-500 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-xs font-bold text-gray-900">
                                    4.6
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  1.2 km
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Pickup: 7-9 PM
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-[#2d5f3f]">
                                    Rs 350
                                  </span>
                                  <span className="text-xs text-gray-400 line-through">
                                    Rs 650
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card 3 - Cafe */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
                          <div className="flex gap-3 p-3">
                            <div
                              className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to bottom right, #99d4d0, #99d4d0, #066f6c)",
                              }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  className="w-12 h-12 opacity-50"
                                  style={{ color: "#066f6c" }}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow">
                                -50%
                              </div>
                              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                3h left
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-bold text-gray-900 truncate">
                                    Cafe Delight
                                  </h3>
                                  <p className="text-xs text-gray-500 truncate mt-0.5">
                                    Sandwiches & Fresh Salads
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                  <svg
                                    className="w-3.5 h-3.5 text-amber-500 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-xs font-bold text-gray-900">
                                    4.9
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  0.5 km
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Pickup: 5-7 PM
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-[#2d5f3f]">
                                    Rs 250
                                  </span>
                                  <span className="text-xs text-gray-400 line-through">
                                    Rs 500
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
                </div>

                {/* Hand Illustration */}
                <svg
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-32 opacity-40"
                  viewBox="0 0 200 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 120 Q80 130 60 125 Q40 120 30 110 Q20 100 25 85 Q30 70 40 60 Q50 50 60 45 Q70 40 80 38 Q90 36 100 40 Q110 36 120 38 Q130 40 140 45 Q150 50 160 60 Q170 70 175 85 Q180 100 170 110 Q160 120 140 125 Q120 130 100 120 Z"
                    fill="#1a3d2b"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="rounded-full blur-3xl"
            style={{
              position: "absolute",
              top: "80px",
              right: "80px",
              width: "384px",
              height: "384px",
              backgroundColor: "rgba(6, 111, 108, 0.1)",
            }}
          ></div>
          <div
            className="rounded-full blur-3xl"
            style={{
              position: "absolute",
              bottom: "80px",
              left: "80px",
              width: "384px",
              height: "384px",
              backgroundColor: "rgba(6, 111, 108, 0.1)",
            }}
          ></div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative border-t border-white/10 py-12"
        style={{ backgroundColor: "#0a4845" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <Logo className="mb-4" textColor="white" />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#99d4d0" }}
              >
                Connecting surplus food with those who want quality meals at
                affordable prices.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm" style={{ color: "#99d4d0" }}>
                <li>
                  <a className="pointer-events-none cursor-not-allowed opacity-60">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="pointer-events-none cursor-not-allowed opacity-60">
                    How It Works
                  </a>
                </li>
                <li>
                  <a className="pointer-events-none cursor-not-allowed opacity-60">
                    For Businesses
                  </a>
                </li>
                <li>
                  <a className="pointer-events-none cursor-not-allowed opacity-60">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
              <p className="text-sm mb-3" style={{ color: "#99d4d0" }}>
                Join our mailing list to receive launch updates and occasional
                product news. We only store your email in Notion for now.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && status !== "loading") {
                      e.preventDefault();
                      handleSubscribe();
                    }
                  }}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === "loading"}
                  className="px-4 py-2 bg-white rounded-lg font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#066f6c" }}
                >
                  {status === "loading" ? "Sending..." : "Join"}
                </button>
              </div>
              <div className="mt-2">
                {status === "success" && (
                  <p className="text-sm" style={{ color: "#f9f3f1" }}>
                    {message}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-300">{message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "#99d4d0" }}>
              © 2026 LeftNotOver. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                className="pointer-events-none cursor-not-allowed opacity-60"
                style={{ color: "#99d4d0" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                className="pointer-events-none cursor-not-allowed opacity-60"
                style={{ color: "#99d4d0" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                className="pointer-events-none cursor-not-allowed opacity-60"
                style={{ color: "#99d4d0" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.211-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .phone-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
