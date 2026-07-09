const fs = require('fs')

// fs.writeFile('./output.txt', 'Hello guys, this is KNOX!! I am Learning JavaScript', (err) => { 
//     if (err) {
//         console.error(err)
//     } else {
//         console.log('File written successfully')
//     }
// })

// const response = fs.writeFileSync('./outputSync.txt', 'Hello guys, this is KNOX!! I am Learning JavaScript')
// console.log(response) // undefined, because writeFileSync does not return anything

fs.appendFile('./output.txt', '\nappending data to the output file', (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('File appended successfully')
    }
})