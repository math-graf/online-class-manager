/*
let subject = "biologia, nuke"

let subjectVector = subject.split(',')

const subjectVectorTrimmed = function() {
    let newVector = []
    for (item of subjectVector) {
        newVector.push(item.trim())
    }
    return newVector
}

console.log(subjectVectorTrimmed())
console.log(subjectVector)
*/
/*
const time = 672883200000

const today = new Date()
const birthDay = new Date(time)

let age = today.getFullYear() - birthDay.getFullYear()
const month = today.getMonth() - birthDay.getMonth()
const day = today.getDate() - birthDay.getDate()

if (month < 0 || month == 0 && day < 0) {
    age -= 1
}

return age
*/

const array = [1, 2, 3, 10]

const number = 4

console.log(array.indexOf(number))

if (!array.indexOf(number)) {
    console.log('false')
}