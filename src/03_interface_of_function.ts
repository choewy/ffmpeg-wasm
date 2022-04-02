// interface
interface TestFunction1 {
    (arg: number): number,
};

// use interface
const testFunction1: TestFunction1 = (arg) => {
    return arg + 1;
};

testFunction1(1);

// use type
const testFunction2 = (num: number, add?:number ):number => {
    if (add) {
        return num + add;
    };
    return num;
};

testFunction2(1, 2);

// user type to array
const testFunction3 = (...nums:number[]): number => {
    let total = 0;
    nums.forEach(num => {
        total += num
    });
    return total;
};

testFunction3(1, 2, 3, 4, 5);

// use bind
interface What {
    is: string;
};

function whatIsIt(this:What) {
    console.log(this.is);
};

const what: What = {is: 'TypeScript'};
const thisIsTypeScript = whatIsIt.bind(what);

// use overload
interface SomeThing {
    name: string;
    count: number;
};

function join(name: string, count: string): string;
function join(name:string, count:number): SomeThing;
function join (name: string, count: number | string): SomeThing | string {
    if (typeof count === 'number') {
        return {
            name,
            count
        };
    } else {
        return 'count must number type';
    };
};

const apple:string = join("apple", '2');
const macBook:SomeThing = join("macBook", 2);