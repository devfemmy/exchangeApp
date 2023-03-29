/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  emailAddress: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
export const PhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .min(11, ({min}) => `Phone Number must be at least ${min} characters`)
    .required('Phone Number is required'),
});
export const CompanyVerificationSchema = yup.object().shape({
  CACNumber: yup.string().required('CAC Number is required'),
  registeredName: yup.string().required('Company Name is required'),
});
export const UsdSchema = yup.object().shape({
  beneficiaryName: yup.string().required('Beneficiary Name is required'),
  beneficiaryAddress: yup.string().required('Beneficiary Address is required'),
  bankName: yup.string().required('Bank Name is required'),
  bankAccount: yup.string().required('Bank Account is required'),
  beneficiaryEmail: yup.string().email().required('Beneficiary Email is required'),
  phoneNumber: yup.string()
  .min(11, ({min}) => `Phone Number must be at least ${min} characters`)
  .required('Phone Number is required'),
});
export const ForgetPasswordSchema = yup.object().shape({
  emailAddress: yup.string().email().required('Email is required'),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, ({min}) => `Old password must be at least ${min} characters`)
    .required('Password is required'),
    newPassword: yup
    .string()
    .min(6, ({min}) => `New password must be at least ${min} characters`)
    .required('Password is required'),
    confirmNewPassword: yup
    .string()
    .min(6, ({min}) => `Confirm new password must be at least ${min} characters`)
    .required('Password is required'),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
  .string()
  .min(6, ({min}) => `New password must be at least ${min} characters`)
  .required('Password is required'),
  confirmNewPassword: yup
  .string()
  .min(6, ({min}) => `Confirm new password must be at least ${min} characters`)
  .required('Password is required'),
});


export const CreateAccountSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  // gender: yup.string().required('Gender is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('password is required'),
 confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

export const ProfileAccountSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  gender: yup.string().required('Gender is required'),
  // phoneNumber: yup.string().required('Phone Number is required'),
  country: yup.string().required('Country is required'),
  email: yup.string().email().required('Email is required'),
  // state: yup.string().required('State is required'),
  // city: yup.string().required('City is required'),
  streetName: yup.string().required('Street is required'),
  // houseNumber: yup.string().required('Street Number is required'),
});

export const KycAccountOneSchema = yup.object().shape({
  gender: yup.string().required('Gender is required'),
  maritalStatus: yup.string().required('Marital Status is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  streetName: yup.string().required('Street is required'),
});

export const KycAccountTwoSchema = yup.object().shape({
  nextOfKinName: yup.string().required('Next of kin name is required'),
  kinRelationship: yup.string().required('Relationship of kin is required'),
  kinAddress: yup.string().required('Kin address is required'),
  verificationType: yup.string().required('Verification type is required'),
  verificationNumber: yup.string().required('Verification number is required'),
});

export const CreateHomeAddressSchema = yup.object().shape({
 country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street is required'),
  streetNo: yup.string().required('Street Number is required'),
});

export const CreateIdValiditySchema = yup.object().shape({
  number: yup.string().required('Number is required'),
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required('Last Name is required'),
   middleName: yup.string().required('Middle Name is required'),
 });