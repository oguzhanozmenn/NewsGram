import React from 'react';

export const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    aria-label="Like"
    className={filled ? "text-ig_red" : "text-white"}
    fill={filled ? "currentColor" : "none"}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    stroke="currentColor"
    strokeWidth={filled ? "0" : "2"}
  >
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);

export const CommentIcon = () => (
  <svg aria-label="Comment" className="text-white" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" strokeLinejoin="round"></path>
  </svg>
);

export const ShareIcon = () => (
  <svg aria-label="Share Post" className="text-white" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
  </svg>
);

export const SaveIcon = () => (
  <svg aria-label="Save" className="text-white" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
    <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
  </svg>
);

export const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Home" className={active ? "text-white" : "text-gray-500"} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth={active ? "0" : "2"}>
    <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export const SearchIcon = ({ active }: { active?: boolean }) => (
  <svg aria-label="Search" className={active ? "text-white" : "text-gray-500"} fill={active ? "currentColor" : "none"} height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth={active ? "0" : "2"}>
    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 0 17Z" strokeLinecap="round" strokeLinejoin="round"></path>
    <line x1="16.511" y1="16.511" x2="22" y2="22" strokeLinecap="round" strokeLinejoin="round"></line>
  </svg>
);

export const ReelsIcon = () => (
  <svg aria-label="Reels" className="text-gray-500" fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
    <path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.022 2.17 0 3.863.598 4.614 4.991Zm1.674 0c.393 0 .74.021 1.042.061L13.094 6.002h4.926l2.434-4.962a6.04 6.04 0 0 0-3.257-.039Zm-8.418 5.002L8.56 1.048a6.043 6.043 0 0 0-3.335.115l2.492 4.839h-1.638Z" strokeLinejoin="round" strokeWidth="2"></path>
    <rect height="16" rx="3" ry="3" width="21" x="1.5" y="7" strokeLinejoin="round" strokeWidth="2"></rect>
    <line x1="6.5" x2="6.5" y1="7" y2="23" strokeLinejoin="round" strokeWidth="2"></line>
    <line x1="17.5" x2="17.5" y1="7" y2="23" strokeLinejoin="round" strokeWidth="2"></line>
  </svg>
);

export const ProfileIcon = () => (
  <div className="w-6 h-6 rounded-full bg-gray-500 border border-gray-700 flex items-center justify-center overflow-hidden">
     <img src="https://picsum.photos/seed/user/100/100" alt="profile" className="w-full h-full object-cover" />
  </div>
);

export const MoreOptionsIcon = () => (
    <svg aria-label="More options" className="text-white" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="6" cy="12" r="1.5"></circle>
        <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
);
