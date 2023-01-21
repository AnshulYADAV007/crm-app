// try {
//     // execute statements
// } catch (err) {
//     // handle error 
// }

/*
try {
    console.log("entered try block")
    undefinedfunc()
    console.log("invoked func in try block")
} catch (err) {
    console.log('entered catch block')
    console.log("Err: ", err)
    console.log("Printed Error")
}
*/

const fs = require('fs')
/*
fs.readFile("C:/Users/sonil/Anshul/Relevel/crm-app/crm-app/content.txt",'utf-8', (err, data) => {
    if(err) {
        console.log("Err: ", err)
    } else {
        console.log("Data: ", data)
    }
})
*/

let readFile_promise = new Promise((resolve, reject) => {
    fs.readFile("C:/Users/sonil/Anshul/Relevel/crm-app/crm-app/content.txt",
                'utf-8', (err, data) => {
                    if(err) reject(err)
                    else resolve(data)
                })
})

// readFile_promise.then(
//         data => console.log("data: ", data)
//     ).catch(err => console.log("Err: ", err))

/*
promise.then(callbackfn1)
    .then(callbackfn2)
    .then(callbackfn3)
    .catch(errHandlingfn)  
*/

const async_file_read = async function() {
    try {
        let readFile_promise = new Promise((resolve, reject) => {
            fs.readFile("C:/Users/sonil/Anshul/Relevel/crm-app/crm-app/content.txt",
                        'utf-8', (err, data) => {
                            if(err) reject(err)
                            else resolve(data)
                        })
        })
        let data = await readFile_promise;
        console.log("data: ", data)

    } catch (err) {
        console.log("Err:", err)
    }
}
async_file_read()