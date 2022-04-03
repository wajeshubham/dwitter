export interface User {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  wallet: string;
}

export interface DweetI {
  id: string;
  author: User;
  content: string;
  timestamp: number;
  images: string[];
  likes: string[];
}
