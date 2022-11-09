export interface IEmployee {
  EmployeeId: string;
  FullName: string;
  Designation: string;
  EmployeeType: string;
  ProfileImage: string;
  ServiceLocation: string;
  Gender: string;
  ContactNumber: string;
  EmergContactNo: string;
  ServiceEmail: string;
  PersonalEmail: string;
  BloodGroup: string;
  DateOfBirth: string;
  NidNumber: string;

  // section: present address
  PresnAddress: string;
  PresnAreaOrVill: string;
  PresnCity: string;
  PresnState: string;
  PresnPostalCode: string;
  PresnCountry: string;

  // section: permanent address
  PermAddress: string;
  PermAreaOrVill: string;
  PermCity: string;
  PermState: string;
  PermPostalCode: string;
  PermCountry: string;

  // section: official information
  BranchId: string;
  ReferredBy: string;
  UserId: string;
  UserPassword: string;
  JoiningDate: string;

  // section: other
  MHId: string;
  MHParentId: string;
  AccessType: string;

  // section: required documents
  RequiredDocuments: string;
  RequiredDocumentsNames: string;

  // section: permissions
  Permissions: string;

  IsActive: Boolean;

  CreatedAt: number;
  CreatedBy: string;
  LastModified: number;
  LastModifiedBy: string;
}
