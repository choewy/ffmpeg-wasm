// Literal Type
type Job = 'police' | 'developer' | 'teacher';

interface Human {
    name: string;
    job: Job;
};

const human: Human = {
    name: 'choewy',
    job: 'police'
};

// Union Type
interface iPad {
    name: 'iPad';
    siri(): void;
};

interface GalaxyPad {
    name: 'GalaxyPad',
    bixby(): void;
};

const selectPad = (pad: iPad | GalaxyPad) => {
    console.log(pad.name);
    if (pad.name === 'iPad') {
        pad.siri();
    } else{
        pad.bixby();
    };
};

interface Apple {
    name: string;
    siri(): void;
}

interface LapTop {
    name: string;
    color: string;
    price: number;
}

// Intersection Type
const macBookPro: Apple & LapTop = {
    name: 'Apple',
    color: 'space gray',
    price: 4500000,
    siri: () => {
        console.log('nice to meet you');
    }
};


