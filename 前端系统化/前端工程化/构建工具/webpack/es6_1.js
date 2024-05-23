import {a,add} from './es6.js';

let newA = a;
console.log('a-before', a);
add();
console.log('a-after', newA);

export default {
    a,add
}
