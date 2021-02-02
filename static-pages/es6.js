let a = "outer";

function b() {
    let d = "innner";
    function c(){
        a = "c-innner";
        console.log(d);
    }
    return c();

};
let d = b();

console.info(Math.max.call(null,1,2,3));


