let a: number | string = 20;
a = "45";
let b: number[] = [1, 2, 3, 5];

function add(a: number, b: number): number {
  return a + b;
}

const addNew = (a: number): number => {
  return 0;
};

interface IPerson {
  name: string;
  age: number;
  address?: string;
}

type IPersonNew = {
  name: string;
  age: number;
  address?: string;
};

type numMixStr = number | string;

enum Sex {
  Male,
  Famale,
}

type obj1 = {
  a: number
};

type obj2 = {
  b: number
}

type alltype = obj1 & obj2
console.log('alltype');
