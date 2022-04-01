interface NumberFunction {
    (arg: number): number,
};

const numberFunction: NumberFunction = (arg) => {
    return arg + 1;
};

const num = numberFunction(1);