
import React, { useState, useEffect } from 'react';
import { MediaItem } from '../../types';
import { fetchMediaItems } from '../../api/mediaApi';
import Layout from '../../components/Layout/Layout';

const MediaPage: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMediaItems().then(setMediaItems);
  }, []);

  const headerAction = (
    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-colors">
      <span className="material-symbols-outlined text-lg">upload</span>
      上传素材
    </button>
  );

  return (
    <Layout
      title="媒体资源库"
      action={headerAction}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      currentNav="media"
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm text-text-muted">管理您的广告视频和素材</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-surface rounded-xl border border-border-light overflow-hidden shadow-soft group hover:border-primary transition-all">
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="size-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined">{item.type === 'video' ? 'play_arrow' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-text-main truncate w-32">{item.name}</p>
                  <p className="text-[10px] text-text-muted">{item.size}</p>
                </div>
                <button className="text-text-muted hover:text-rose-500">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MediaPage;
