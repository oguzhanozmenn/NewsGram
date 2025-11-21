export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string; // Represents the "username"
  category: string;
  timeAgo: string;
  likes: number;
  imageUrl?: string; // URL from search or placeholder
  sourceUrl?: string; // Link to actual article
  likedByMe?: boolean;
}

export enum Category {
  GUNDEM = 'Gündem',
  TEKNOLOJI = 'Teknoloji',
  SPOR = 'Spor',
  EKONOMI = 'Ekonomi',
  MAGAZIN = 'Magazin',
  BILIM = 'Bilim',
}

export interface Story {
  id: string;
  name: string;
  hasUnseen: boolean;
  category: Category;
}