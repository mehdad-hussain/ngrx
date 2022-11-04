export interface IUser {
  id: string;
  mobile: string;

  role: string;
  permissions: string;

  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  newProfileImage: string;

  address: string;
  city: string;
  country: string;

  createdAt: number;
  createdBy: string;
  lastModified: number;
  lastModifiedBy: string;
}
