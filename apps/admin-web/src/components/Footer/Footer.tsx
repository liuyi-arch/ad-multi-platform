
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 flex flex-col items-center gap-4 bg-transparent mt-12">
      <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
        <a className="hover:text-primary transition-colors" href="#">帮助中心</a>
        <a className="hover:text-primary transition-colors" href="#">服务协议</a>
        <a className="hover:text-primary transition-colors" href="#">隐私政策</a>
      </div>
      <p className="text-xs font-medium text-slate-400/80 uppercase tracking-widest">
        © 2024 ADWALL TECHNOLOGIES. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;
