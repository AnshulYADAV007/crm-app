let boss = async function() {
    let func1 = function(resolve, reject) {
        setTimeout(function() {
            console.log('in setTimeOur callback 1')
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
    let promise2 = new Promise(func2)
    await promise1, promise2
    console.log("Both promises done.", promise1, promise2)    
}

boss()