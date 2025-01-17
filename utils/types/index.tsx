/* eslint-disable prettier/prettier */


export type ButtonType = {
    children: string,
    isLoading?: boolean,
    handlePress?: () => void,
    type?: string,
    disabled?: boolean
}

export type LoginFormData = {
    emailAddress: string,
    password: string,
}
export type CompanyVerificationFormData = {
    CACNumber: string,
    registeredName: string,
}

export type UsdFormData = {
    beneficiaryName: string,
    beneficiaryAddress: string,
    bankName: string,
    bankAccount: string,
    swiftCode: string,
    beneficiaryEmail: string,
    phoneNumber: string
}

export type ButtonProps = {
    title: string,
    isLoading?: boolean,
    outlined?: any,
    style?: any,
    containerStyle?: any,
    small?: any,
    rest?: any,
    colored?: boolean,
    handlePress?: (data?: any) => void
}



export type changePasswordData = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export type ResetPasswordData = {
    newPassword: string;
    confirmNewPassword: string;
}


export type CreateAccountFormDataUi = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    // gender: string,
    password: string,
    confirmPassword: string,
}

export type CreateUsd = {
    swiftCode: string,
    amount: number,
    charges: number,
    beneficiary: {
        name: string,
        address: string,
        bankName: string,
        bankAccountNumber: string,
        emailAddress: string,
        phoneNumber: string,
        country: string
    },
    paymentInvoice: {
        isUploaded: boolean,
        file: string
    }
}

export type HomeAddress = {
    country: string,
    state: string,
    city: string,
    street: string,
    streetNo: string
}

export type IdValidity = {
   number: string,
   firstName: string,
   middleName: string,
   lastName: string
}




export type ForgetPasswordFormData = {
    emailAddress: string
}

export type PhoneNumberData = {
    phone: string
}


export type ProfileFormData = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    gender: string,
    country: string,
    streetName: string,
    phone: string,
    dob: string,
    image?: string,
}

export type KyCFormDataOne = {
    gender: string,
    country: string,
    state: string,
    city: string,
    streetName: string,
    maritalStatus: string
}

export type KyCFormDataTwo = {
    nextOfKinName: string,
    kinRelationship: string,
    kinAddress: string,
    verificationType: string,
    verificationNumber: string,
}

export type AddressAccountFormData = {
    userId: string;
    country?: string,
    state?: string,
    city?: string,
    houseNumber?: string,
    streetName?: string,
    phone?: string
}

export type LoginState = {
    userData:any,
    userInfo: any,
    loading: boolean,
    error: any
}

