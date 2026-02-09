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
                className="h-[200px] w-auto"
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <div className="space-y-4">
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white ${
                  language === "ur" ? "font-urdu" : ""
                }`}
                dir={language === "ur" ? "rtl" : "ltr"}
              >
                {t.title}
                <span className="block">{t.titleSecond}</span>
              </h1>
              <p
                className={`text-xl sm:text-2xl text-white font-light max-w-2xl mx-auto lg:mx-0 ${
                  language === "ur" ? "font-urdu" : ""
                }`}
                dir={language === "ur" ? "rtl" : "ltr"}
              >
                {t.subtitle}
              </p>
            </div>

            <div
              className={`space-y-6 text-lg sm:text-xl text-white max-w-2xl mx-auto lg:mx-0 ${
                language === "ur" ? "font-urdu" : ""
              }`}
              dir={language === "ur" ? "rtl" : "ltr"}
            >
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>
          </div>

          {/* Right Column - Mobile App Mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative transform rotate-6 hover:rotate-3 transition-transform duration-500">
              {/* Hand shadow/base */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-20 bg-black/20 rounded-full blur-xl"></div>

              {/* Phone Mockup */}
              <div className="relative w-72 h-[600px] mx-auto">
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
    </div>
  );
}
