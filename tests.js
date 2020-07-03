/*

const req = { id: 1, nome: 'Matheus', idade: 30 }

let data = {
    array: [
        { id: 1, nome: 'Matheus', idade: 28 },
        { id: 2, nome: 'Patrícia', idade: 25 },
        { id: 3, nome: 'Selso', idade: 66 },
        { id: 4, nome: 'Lena', idade: 61 }
    ]
}

const { id } = req

let index = 0

const foundId = data.array.find(function(pessoa, foundIndex) {
    if (pessoa.id == id) {
        index = foundIndex
        return true
    }
})

const objeto = {
    ...foundId,
    ...req
}

data.array[index] = objeto

console.log(data)

======================================================

const data = require('./data.json')

const teachersList = data.teachers

for (teacher of teachersList) {
    const vectorizedSubjects = teacher.subjects.split(',')
    let newVector = []
    
    for (item of vectorizedSubjects) {
        newVector.push(item.trim())
    }

    teacher.subjects = newVector
}

console.log(teachersList)

*/

/* ======================================================== */

let string = ["Presential"]

if (typeof string == 'string') {
    let newVector = []
    const subjectsSplitted = string.split(',')
    
    for (item of subjectsSplitted) {
        newVector.push(item.trim())
    }
    
    string = newVector
}

console.log(newVector)