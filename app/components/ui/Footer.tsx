import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 mb-20">
          {/* Left - Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-5xl lg:text-6xl font-light tracking-tight mb-4">
                Deflated Pappadam
              </h3>
              <p className="text-gray-400 text-lg font-light">-_-</p>
            </div>
          </div>

          {/* Center - Contact */}
          <div className="space-y-8">
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Let&apos;s create something extraordinary
            </p>
            
            <div className="space-y-6">
              <a
                href="mailto:info@deflatedpappadam.com"
                className="group flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-500 ease-out"
              >
                <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white transition-all duration-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="text-lg font-light">Get in touch</span>
              </a>

              <a
                href="https://github.com/Deflated-Pappadam"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-500 ease-out"
              >
                <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white transition-all duration-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <span className="text-lg font-light">View our work</span>
              </a>
            </div>
          </div>

          {/* Right - Location */}
          <div className="space-y-4 lg:text-right">
            <p className="text-gray-400 text-sm font-light uppercase tracking-wider">
              Based in
            </p>
            <p className="text-gray-200 text-xl font-light">
              Thiruvananthapuram, Kerala
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-light">
              © 2025 Deflated Pappadam. Crafted with precision.
            </p>
            
            {/* Decorative element inspired by the visual identity style */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gray-600"></div>
              <span className="text-gray-400 text-xs font-light italic tracking-wide">
                Hail Rhon S Goat
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;