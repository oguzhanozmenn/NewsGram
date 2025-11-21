import React, { useEffect, useState, useCallback } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Stories from './components/Stories';
import NewsCard from './components/NewsCard';
import { HomeIcon, SearchIcon, ReelsIcon, HeartIcon, ProfileIcon } from './components/Icons';
import { Category, NewsItem, Story } from './types';
import { fetchNewsFromGemini } from './services/geminiService';

// Initial categories mapping to "Stories"
const INITIAL_STORIES: Story[] = [
  { id: '1', name: 'Gündem', hasUnseen: true, category: Category.GUNDEM },
  { id: '2', name: 'Teknoloji', hasUnseen: true, category: Category.TEKNOLOJI },
  { id: '3', name: 'Spor', hasUnseen: true, category: Category.SPOR },
  { id: '4', name: 'Ekonomi', hasUnseen: true, category: Category.EKONOMI },
  { id: '5', name: 'Magazin', hasUnseen: false, category: Category.MAGAZIN },
  { id: '6', name: 'Bilim', hasUnseen: false, category: Category.BILIM },
];

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.GUNDEM);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch news when category changes
  const loadNews = useCallback(async (category: Category) => {
    setLoading(true);
    // Clear current news to show loading state effectively or keep old ones? 
    // Instagram keeps old ones until new ones load, but for category switch we usually clear.
    setNews([]); 
    
    const fetchedNews = await fetchNewsFromGemini(category);
    setNews(fetchedNews);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadNews(activeCategory);
  }, [activeCategory, loadNews]);

  const handleLike = (id: string) => {
    setNews(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likedByMe: !item.likedByMe,
          likes: item.likedByMe ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  return (
    <Router>
      <div className="flex justify-center min-h-screen bg-black">
        {/* Mobile Container */}
        <div className="w-full max-w-md bg-black h-screen flex flex-col relative border-x border-gray-800">
          
          {/* Top Nav */}
          <header className="flex justify-between items-center px-4 py-3 border-b border-gray-800 z-10 bg-black sticky top-0">
            <h1 className="text-2xl font-bold font-sans tracking-tighter italic">NewsGram</h1>
            <div className="flex items-center gap-5">
               <HeartIcon />
               <div className="relative">
                 <svg aria-label="Messenger" className="text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <path d="M12.003 2.001a9.605 9.605 0 0 1 9.708 9.604c0 3.619-2.55 5.827-5.015 7.97-.283.246-.569.494-.853.747l-1.027.918a44.998 44.998 0 0 1-3.518 3.018 2 2 0 0 1-2.174 0 45.263 45.263 0 0 1-3.626-3.115l-.922-.824c-.293-.26-.59-.519-.885-.774-2.334-2.025-4.98-4.32-4.98-7.94a9.605 9.605 0 0 1 9.708-9.604Z"></path>
                 </svg>
                 <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">2</div>
               </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto no-scrollbar pb-16">
            {/* Stories / Categories */}
            <Stories 
              stories={INITIAL_STORIES} 
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Feed */}
            <div className="mt-2">
              {loading ? (
                // Loading Skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="mb-8 animate-pulse">
                    <div className="flex items-center px-3 py-2 gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                      <div className="h-3 bg-gray-800 w-24 rounded"></div>
                    </div>
                    <div className="w-full aspect-square bg-gray-800"></div>
                    <div className="px-3 py-2 space-y-2">
                       <div className="h-4 bg-gray-800 w-full rounded"></div>
                       <div className="h-4 bg-gray-800 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))
              ) : news.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p>Haberler yüklenemedi veya bulunamadı.</p>
                 </div>
              ) : (
                news.map(item => (
                  <NewsCard 
                    key={item.id} 
                    item={item} 
                    onLike={handleLike} 
                  />
                ))
              )}
            </div>
          </main>

          {/* Bottom Nav */}
          <nav className="border-t border-gray-800 bg-black px-4 py-3 flex justify-between items-center absolute bottom-0 w-full z-20">
            <button onClick={() => setActiveCategory(Category.GUNDEM)} className="flex flex-col items-center">
              <HomeIcon active={activeCategory === Category.GUNDEM} />
            </button>
            <button className="flex flex-col items-center">
              <SearchIcon />
            </button>
            <button className="flex flex-col items-center">
              <ReelsIcon />
            </button>
            <button className="flex flex-col items-center">
              <div className="w-6 h-6">
                <svg aria-label="News Feed" className="text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <line x1="7" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </button>
            <button className="flex flex-col items-center">
              <ProfileIcon />
            </button>
          </nav>

        </div>
      </div>
    </Router>
  );
}

export default App;