module.exports = {
    subjects: function(subjects) {
        let newVector = []
        
        const subjectsSplitted = subjects.split(',')
        
        for (item of subjectsSplitted) {
            newVector.push(item.trim())
        }
        
        return newVector
    },
    age: function(timestamp) {
        const today = new Date()
        const birthDay = new Date(timestamp)

        let age = today.getFullYear() - birthDay.getFullYear()
        const month = today.getMonth() - birthDay.getMonth()
        const day = today.getDate() - birthDay.getDate()

        if (month < 0 || month == 0 && day < 0) {
            age -= 1
        }

        return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)
        
        const year = date.getFullYear()
        const month = date.getMonth() +1
        const day = date.getDate()

        return `${day}/${month}/${year}`
    },
    birthDate: function(timestamp) {
        const date = new Date(timestamp)
        
        const year = date.getFullYear()
        const month = `0${date.getMonth() +1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    },
    classes: function(type) {
        let newVector = []

        if (typeof type == 'string') {
            const subjectsSplitted = type.split(',')
        
            for (item of subjectsSplitted) {
                newVector.push(item.trim())
            }
            
            return newVector
        } else return type
    }
}