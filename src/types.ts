type UserAvatarTye = {
  name: string;
  image?: string;
};

type AuthStateType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type CommunityAuthStateType = {
  name?: string;
  email?: string;
  username?: string;
  bio?: string;
  created_by?:string | null | undefined;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

type CommunityAuthErrorType = {
  name?: string;
  email?: string;
  bio?: string;
  created_by?:string;
  username?: string;
  password?: string;
};

type PostErrorType = {
  content?: string;
  image?: string;
};

// * Post type
type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
};

type Community = {
  id: number;
  name: string;
  username: string;
  email?: string;
  bio: string;
  image?: string;
};

type PostType = {
  id: number;
  user_id: number;
  community_id: number;
  content: string;
  image?: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  user: User;
  Likes: Array<PostLikeType> | [];
};

type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: User;
};

type NotificationType = {
  id: number;
  user_id: number;
  toUser_id: number;
  content: string;
  created_at: string;
  user: User;
};

type ShowUserType = {
  name: string;
  id: string;
  email: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};

type ShowCommunityType = {
  name: string;
  id: string;
  email: string;
  bio: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};

type LikeType = {
  post_id: string;
  toUserId: string;
  status: string;
};

type PostLikeType = {
  id: number;
  post_id: number;
  user_id: number;
};

// types.ts

type FollowType = {
  user_id: string; // The user you want to follow/unfollow
  status: string; // "follow" or "unfollow"
};

type FollowerType = {
  id: number;
  followerId: number; // The user who is following
  followingId: number; // The user being followed
};
