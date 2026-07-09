const fs = require('fs')

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err)
        return
    }

    const cleanedData = data.replace(/\s{2,}/g, ' ')
    console.log('Cleaned Data:', cleanedData)

})