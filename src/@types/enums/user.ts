export enum EUserType {
  User = 0, // Normal user
  SharePointGroup = 1, // SharePoint Group
  ADGroup = 2, //On premise AD group or Azure AD Security group
  AADGroup = 3, //Azure non security group
  ExternalUser = 4, //Users synchronized from file
  DynamicDistributionGroup = 5, // Dynamic distribution group
}
