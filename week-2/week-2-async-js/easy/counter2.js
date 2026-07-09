let i = 1
function counter2() { 
    setTimeout(() => {
        console.log(i)
        i++
        counter2()
    }, 1000)
}

counter2()