function getSize(arr: Array<number>): number {
    return arr.length;
};

const numberArray = [1, 2, 3];
getSize(numberArray);

/* 
    함수의 인자 타입을 
    number[]로 하였기 때문에 
    string[]을 인자로 넘겨주는 경우 오류 발생.
    Overload, Union로 해결 가능하나,
    새로운 타입이 추가되면 매번 재설정해야 함.
    이때 사용할 수 있는 것이 바로 Generic.
*/

// Generics using Function
/*
    Generic을 사용하면
    인터페이스, 클래스, 함수 등
    다양한 타입으로 재사용 가능
*/
function getSizeGeneric<T>(arr: T[]): number {
    return arr.length;
};

const stringArray = ['1', '2', '3'];
getSizeGeneric(stringArray);
getSizeGeneric<string>(stringArray);

// Generics using Interface
interface Phone<T> {
    price: number;
    option: T;
};

const GalaxyFold: Phone<{bixby: Function}> = {
    price: 1000000,
    option: {
        bixby: ():void => {
            console.log('hi bixby');
        }
    }
};

const iPhone12: Phone<Function> = {
    price: 1000000,
    option: ():void => {
        console.log('hi siri');
    }
};

// Generics advanced
interface Dog {
    name: string;
    kind: string;
};

interface Cat {
    name: string;
    stripe: string;
};

interface Fish {
    from: string;
};

const dog: Dog = {name: 'Bella', kind: 'Retrieve'};
const cat: Cat = {name: 'Catnip', stripe: 'tabby'};
const fish: Fish = {from: 'korea'};

function callName<T extends {name: string}>(data: T): string {
    return data.name;
};

callName(dog);
callName(cat);
// callName(fish);