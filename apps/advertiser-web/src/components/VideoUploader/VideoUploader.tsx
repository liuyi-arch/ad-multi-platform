
import React from 'react';

interface VideoUploaderProps {
  imageUrl?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ imageUrl }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-[#1e293b]">上传视频</label>
      <div className="flex flex-wrap gap-4">
        <div className="w-24 h-24 rounded-xl bg-slate-700 flex flex-col items-center justify-center relative overflow-hidden group border border-slate-600">
          <span className="material-symbols-outlined text-slate-400 mb-1">movie</span>
          <p className="text-[10px] text-white font-medium">上传中 65%</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-600">
            <div className="h-full bg-primary w-[65%]"></div>
          </div>
        </div>

        <div className="w-24 h-24 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url("${imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvrQ-THU_l8zHPzJqJoK0q1GLDzNWjtfcCE02FnH5SRexrKNToVfCy7gMRf8nNFgPv0DCHk8LVPvG-s4Fk8UM1u2iDM0LgLUURCxL9NdiZBL_46odORURazlKUfj-dM-iYl1PW1iAkRCzXoZf0ZMu2T2A546K6WmrRxuEqUuwof2PzzHg2K6joBm9Vzamook3p5KuiiYdR-dPFJzbINVD0oiwFzt9gO_J5jFvHzI3xf7NM2kI1Kcgoxl-zfGyvQgJzm9xhnfjvLbs'}")` }}
          ></div>
          <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-0.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
          </div>
        </div>

        <button className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center hover:border-primary hover:bg-blue-50 transition-all text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined text-2xl mb-1">add</span>
          <p className="text-[10px] font-bold">上传</p>
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2">支持 MP4, MOV 格式，单视频最大 100MB，最多 3 个</p>
    </div>
  );
};

export default VideoUploader;
