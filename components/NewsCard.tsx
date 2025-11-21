import React, { useState } from 'react';
import { NewsItem } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, SaveIcon, MoreOptionsIcon } from './Icons';

interface NewsCardProps {
  item: NewsItem;
  onLike: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const handleLike = () => {
    onLike(item.id);
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 1000);
  };

  const handleImageDoubleTap = () => {
    if (!item.likedByMe) {
        handleLike();
    } else {
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 1000);
    }
  };

  return (
    <div className="mb-4 border-b border-gray-800 pb-2 last:border-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 p-[2px]">
             <div className="w-full h-full rounded-full bg-black p-[2px] overflow-hidden">
                <img 
                    src={`https://picsum.photos/seed/${item.source}/100/100`} 
                    alt={item.source} 
                    className="w-full h-full object-cover rounded-full" 
                />
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white leading-tight">{item.source}</span>
            <span className="text-xs text-gray-400">{item.category}</span>
          </div>
        </div>
        <MoreOptionsIcon />
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full aspect-square bg-gray-900 cursor-pointer"
        onDoubleClick={handleImageDoubleTap}
      >
        <img 
          src={item.imageUrl} 
          alt={item.headline} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        
        {/* Like Animation Overlay */}
        {likeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center animate-ping">
             <HeartIcon filled={true} /> {/* Scaled up via transform ideally, relying on simple ping here for brevity */}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="hover:opacity-70 transition-opacity">
            <HeartIcon filled={item.likedByMe} />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <CommentIcon />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <ShareIcon />
          </button>
        </div>
        <button className="hover:opacity-70 transition-opacity">
          <SaveIcon />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-3 text-sm font-semibold text-white mb-1">
        {item.likes} beğenme
      </div>

      {/* Caption / Content */}
      <div className="px-3">
        <div className="text-sm text-white">
          <span className="font-semibold mr-2">{item.source}</span>
          {item.headline}
        </div>
        
        <div className={`mt-1 text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {item.summary}
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-xs text-gray-500 mt-1 hover:text-gray-300"
        >
          {isExpanded ? 'daha az' : 'devamını oku'}
        </button>

        {/* Source Link (Grounding) */}
        {item.sourceUrl && (
            <div className="mt-2">
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-ig_blue hover:underline flex items-center gap-1">
                    Kaynağa Git 
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
            </div>
        )}

        {/* Time */}
        <div className="mt-2 text-[10px] text-gray-500 uppercase tracking-wide">
          {item.timeAgo} ÖNCE
        </div>
      </div>
    </div>
  );
};

export default NewsCard;