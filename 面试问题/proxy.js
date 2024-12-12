const proxy = new Proxy({},{
    get(taegt, key){
        if(key === 'name') return 'franklin'
        return 'male'
    }
});

console.log('proxy', proxy.sex);
console.log('proxy', proxy.name);

const object = {a: 1,b:3};
const keys = Object.keys(object);
console.log('-----', keys)

for (const key in object) {
    console.log('-----', key)
    // if (Object.hasOwnProperty.call(object, key)) {
    //     const element = object[key];
    // }
}
