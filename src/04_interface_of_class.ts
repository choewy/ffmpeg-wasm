interface User {
    readonly id: number;
    name: string;
    email: string;
};

interface Client extends User {
    sayHello(): void;
};

interface Admin extends User, Client {
    sayBye(): void; 
};

class GameUser implements User {
    id = 1;
    name;
    email;
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    };
};

class GameClient extends GameUser implements Client {
    constructor(name: string, email: string) {
        super(name, email);
    };
    sayHello() {
        console.log('Hi~');
    };
};

class GameAdmin extends GameClient implements Admin {
    sayBye(): void {
        console.log('Bye~');
    };
};

const gameUser = new GameUser('user', '');
const gameClient = new GameClient('client', '');
const gameAdmin = new GameAdmin('admin', '');