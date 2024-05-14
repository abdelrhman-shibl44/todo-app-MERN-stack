export interface TUser {
  _id: string;
  name: string;
  email: string;
  token: string;
  linkedinData: {
    name: string;
    title: string;
    photoUrl: string;
  };
}
