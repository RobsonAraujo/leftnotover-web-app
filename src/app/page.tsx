"use client";

import { useState } from "react";
import Image from "next/image";

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
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#395543] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#395543]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Company Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="LeftNotOver"
                width={600}
                height={200}
                className="h-30 sm:h-24 md:h-32 lg:h-[200px] w-auto"
                priority
              />
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  language === "en"
                    ? "bg-white text-[#395543]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("ur")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  language === "ur"
                    ? "bg-white text-[#395543]"
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
              <span className="block mt-4">{t.titleSecond}</span>
            </h1>
            <p
              className={`text-xl sm:text-2xl lg:text-3xl text-white font-medium max-w-full mx-auto lg:mx-0 leading-relaxed ${
                language === "ur" ? "font-urdu" : "font-inter"
              }`}
              dir={language === "ur" ? "rtl" : "ltr"}
            >
              {t.subtitle}
            </p>

            {/* Stats/Badges - No user interaction needed */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
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
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
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
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
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
              {/* Hand shadow/base */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-20 bg-black/20 rounded-full blur-xl"></div>

              {/* Phone Mockup */}
              <div className="relative w-80 h-[650px] lg:w-88 lg:h-[720px] mx-auto">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-[3rem] shadow-2xl border-8 border-gray-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                  {/* Screen */}
                  <div className="absolute inset-x-2 top-12 bottom-2 bg-white rounded-[2rem] overflow-hidden">
                    {/* App Header */}
                    <div className="h-16 bg-[#395543] flex items-center justify-center rounded-t-[2rem]">
                      <Image
                        src="/logo.png"
                        alt="LeftNotOver"
                        width={100}
                        height={30}
                        className="h-[100px] w-auto"
                      />
                    </div>

                    {/* App Content - Marketplace */}
                    <div className="h-full overflow-y-auto bg-gray-50">
                      {/* Search Bar */}
                      <div className="p-3 bg-white border-b border-gray-200">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
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
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span
                            className={`text-xs text-gray-400 ${
                              language === "ur" ? "font-urdu" : ""
                            }`}
                            dir={language === "ur" ? "rtl" : "ltr"}
                          >
                            {t.searchPlaceholder}
                          </span>
                        </div>
                      </div>

                      {/* Marketplace Cards */}
                      <div className="p-3 space-y-3">
                        {/* Card 1 - Bakery */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                          {/* Food Image */}
                          <div className="relative h-24 bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300">
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                              -60%
                            </div>
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded-full">
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
                          <div className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-gray-900">
                                  Sweet Dreams Bakery
                                </h3>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Mixed Pastries & Breads
                                </p>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <svg
                                  className="w-3 h-3 text-yellow-400 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-700">
                                  4.8
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-[#395543]">
                                  Rs 200
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                  Rs 500
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                                <svg
                                  className="w-3 h-3"
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
                            </div>
                          </div>
                        </div>

                        {/* Card 2 - Restaurant */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                          {/* Food Image */}
                          <div className="relative h-24 bg-gradient-to-br from-red-300 via-pink-300 to-red-400">
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                              -45%
                            </div>
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded-full">
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
                          <div className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-gray-900">
                                  Spice Route
                                </h3>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Curry & Rice Combo
                                </p>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <svg
                                  className="w-3 h-3 text-yellow-400 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-700">
                                  4.6
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-[#395543]">
                                  Rs 350
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                  Rs 650
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                                <svg
                                  className="w-3 h-3"
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
                            </div>
                          </div>
                        </div>

                        {/* Card 3 - Cafe */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                          {/* Food Image */}
                          <div className="relative h-24 bg-gradient-to-br from-green-300 via-emerald-300 to-green-400">
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                              -50%
                            </div>
                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded-full">
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
                          <div className="p-3">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-gray-900">
                                  Cafe Delight
                                </h3>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Sandwiches & Salads
                                </p>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <svg
                                  className="w-3 h-3 text-yellow-400 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-700">
                                  4.9
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-[#395543]">
                                  Rs 250
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                  Rs 500
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                                <svg
                                  className="w-3 h-3"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
                </div>

                {/* Hand Illustration - Simplified */}
                <svg
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-32"
                  viewBox="0 0 200 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simplified hand shape */}
                  <path
                    d="M100 120 Q80 130 60 125 Q40 120 30 110 Q20 100 25 85 Q30 70 40 60 Q50 50 60 45 Q70 40 80 38 Q90 36 100 40 Q110 36 120 38 Q130 40 140 45 Q150 50 160 60 Q170 70 175 85 Q180 100 170 110 Q160 120 140 125 Q120 130 100 120 Z"
                    fill="#2d4235"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#395543] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className={`text-white/60 text-sm ${
                language === "ur" ? "font-urdu" : "font-inter"
              }`}
              dir={language === "ur" ? "rtl" : "ltr"}
            >
              © 2026 LeftNotOver. All rights reserved.
            </p>
            <div className="flex items-center gap-6 pointer-events-none opacity-50">
              <div className="text-white/60">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="text-white/60">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <div className="text-white/60">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.211-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
