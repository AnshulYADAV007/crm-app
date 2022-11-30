// for(let i = 0; i < 10; i++) console.log(i)

// const complete = function() {
//     console.log("Function completed!")
// }

// setTimeout(complete, 5000) // wait for 5 sec.
// console.log("calling after setTimeout")

// const show = function(i) {
//     console.log(i)
// }

// for(let i = 10; i > 0; i++) {
//     setTimeout(show, i * 1000, i) 
// }
// here for all i from 10 to 1, wait for i seconds and then show(i)

// for(let i = 0; i < 3; i++)
// {
//     setTimeout(()=> console.log(i), 1000);
//     i++
// }

let func1 = function(resolve, reject) { // resolve(3) = x => x * 2
    setTimeout(function() {
        resolve(3)
    }, 5000)
}


let func2 = function(resolve, reject) {
    setTimeout(function() {
        console.log('in setTimeOur callback 2')
        resolve(5)
    }, 3000)
}

let promise1 = new Promise(func1)
// let promise2 = new Promise(func2)

promise1.then(
            x => {
                console.log(`input = ${x}`); 
                return x * 2
            }).then(console.log)
// Promise.all([promise1, promise2]).then(arr => console.log(arr))

// let i = 0
// while(i < 3) {
//     setTimeout(() => console.log(i), 1000)
//     i++
// }
// console.log("after loop", i)

// setTimeout