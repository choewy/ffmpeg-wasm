type Gender = 'male' | 'female';

interface UserObject {
    readonly id: number,
    name: string,
    age: number,
    gender: Gender,
    languages: {
        [language: number]: string
    },
    email?: string,
};

const user: UserObject = {
    id: 0,
    name: "choewy",
    age: 28,
    gender: 'male',
    languages: {
        0: "JavaScript",
        1: "TypeScript"
    }
};

user.email = "choewy32@gmail.com";