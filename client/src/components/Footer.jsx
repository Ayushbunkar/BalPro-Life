import React from 'react';

const Footer = () => {
  return (
    <footer style={{backgroundColor: '#0A0807'}} className="w-full pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-10 max-w-[1440px] mx-auto">
        {/* Brand Section */}
        <div className="space-y-8">
          <div className="text-xl font-bold text-[#efbf70] font-headline" style={{fontFamily: 'Epilogue'}}>
            BALPRO LIFE
          </div>
          <p className="font-body text-xs text-[#d9c4a2] leading-relaxed opacity-60" style={{fontFamily: 'Manrope'}}>
            The intersection of science-driven performance and cinematic wellness luxury.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#efbf70] cursor-pointer hover:scale-110 transition-transform" style={{fontFamily: 'Material Symbols Outlined'}}>
              share
            </span>
            <span className="material-symbols-outlined text-[#efbf70] cursor-pointer hover:scale-110 transition-transform" style={{fontFamily: 'Material Symbols Outlined'}}>
              star
            </span>
            <span className="material-symbols-outlined text-[#efbf70] cursor-pointer hover:scale-110 transition-transform" style={{fontFamily: 'Material Symbols Outlined'}}>
              public
            </span>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-6">
          <h4 className="font-headline font-bold text-lg text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
            Collections
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Performance
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Recovery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Limited Drop
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-6">
          <h4 className="font-headline font-bold text-lg text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
            Company
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Wellness Journal
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-6">
          <h4 className="font-headline font-bold text-lg text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
            Legal
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label text-[0.6875rem] uppercase tracking-[0.1rem] text-[#d9c4a2] hover:text-[#efbf70] hover:translate-x-1 transition-transform duration-300 block"
                style={{fontFamily: 'Manrope'}}
              >
                Shipping
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-24 pt-12 border-t border-[#373432]/10 text-center max-w-[1440px] mx-auto px-10">
        <p
          className="font-label text-[0.6875rem] uppercase tracking-[0.2rem] text-[#d9c4a2] opacity-40"
          style={{fontFamily: 'Manrope'}}
        >
          © 2024 BALPRO LIFE. THE CINEMATIC CURATOR.
        </p>
      </div>
    </footer>
  );
};

export default Footer;