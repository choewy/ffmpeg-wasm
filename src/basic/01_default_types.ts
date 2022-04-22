// Default Types
const numberType: number = 1;
const stringType: string = 'TypeScript';
const booleaType: boolean = true;
const nullType:null = null;
const undefinedType:undefined = undefined;

// Array Types
const numberArrayType1: number[] = [1, 2, 3];
const numberArrayType2: Array<number> = [1, 2, 3];
const stringArrayType1: string[] = ['TypeScript'];
const stringArrayType2: Array<string> = ['TypeScript'];

// Tuple Types
const tupleArrayType: [number, string] = [1, 'TypeScript'];

// void Types
const voidFunction = ():void => {
    console.log('TypeScript');
};

// never Types
const neverFunction1 = ():never => { throw Error(); };
const neverFunction2 = ():never => { while (true) {}; };

// enum Type
enum Languages {
    JavaScript = "JavaScript",
    TypeScript = "TypeScript"
};

let myLanguage: Languages;
myLanguage = Languages.JavaScript;
myLanguage = Languages.TypeScript;

// literal Type
type CustomType = 'male' | 'femail';
const gender: CustomType = 'male';