import React from 'react';
import { Category, Story } from '../types';

interface StoriesProps {
  stories: Story[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

const Stories: React.FC<StoriesProps> = ({ stories, activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full border-b border-gray-800 py-4 bg-black">
      <div className="flex overflow-x-auto space-x-4 px-4 no-scrollbar">
        {stories.map((story) => {
          const isActive = story.category === activeCategory;
          return (
            <div 
              key={story.id} 
              className="flex flex-col items-center space-y-1 min-w-[72px] cursor-pointer"
              onClick={() => onSelectCategory(story.category)}
            >
              <div className={`w-[72px] h-[72px] rounded-full p-[3px] ${isActive ? 'bg-gradient-to-tr from-yellow-400 to-red-600' : 'bg-gray-700'}`}>
                <div className="w-full h-full rounded-full border-2 border-black bg-black overflow-hidden flex items-center justify-center relative">
                  <img 
                    src={`https://picsum.photos/seed/${story.name}/100/100`} 
                    alt={story.name}
                    className={`w-full h-full object-cover transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
                  />
                </div>
              </div>
              <span className={`text-xs truncate w-full text-center ${isActive ? 'font-semibold text-white' : 'text-gray-400'}`}>
                {story.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;