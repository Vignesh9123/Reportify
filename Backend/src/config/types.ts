export {}; // This line ensures the file is treated as a module
declare global {
    namespace Express {
        interface Request {
            user: UserType; 
        }
    }
}


export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: string;
    loginType: string
};

export type submissionDetailsType = {
    name: string;
    rollNumber: string;
    USN: string;
};

export type professorDetailsType = {
    name: string;
    designation: string;
    department: string;
    college: string;
};
