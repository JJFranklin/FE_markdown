// function getAsteroids(arr){
//     // if(!arr || arr.length || !Array.isArray(arr)) return [];
//     let result = [];
//     arr.map((item,i)=>{
//         arr.map((num,j)=>{
            
//         });
//     });

//     return result;
// }
// const asteroids = [5,10,-5];
// console.log('result',getAsteroids(asteroids));

 var asteroidCollision = function (asteroids) {
    const stack = [];
    for (let i = 0; i < asteroids.length; i++) {
        const curr = asteroids[i];
        let top = stack.slice(-1)[0];
        if (top > 0 && curr < 0) {
            while (top > 0 && stack.length && top < -curr) {
                stack.pop();
                top = stack.slice(-1)[0]
            }
            if (top === -curr) {
                stack.pop();
            } else if (!top || top < 0) {
                stack.push(curr);
            }
        } else {
            stack.push(curr)
        }
    }
    return stack
};

const a = [1,-2,3,4-5,6,10,-20]

const result = asteroidCollision(a)
console.log('result', result);

