export interface UserType {
  username: string;
  email: string;
  password?: string;
  profilePic?: string;
  isAdmin?: boolean;
}

export interface MovieType {
  title: String;
  desc: String;
  img?: String;
  imgTitle?: String;
  imgSm?: String;
  trailer?: String;
  video?: String;
  year?: String;
  limit?: Number;
  genre?: String;
  isSeries?: Boolean;
}

// Create the interface
export interface ListType {
  title: String;
  type?: String;
  genre?: String;
  content?: Array<any>;
}
