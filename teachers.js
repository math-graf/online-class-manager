const fs = require('fs')
const data = require('./data.json')
const { subjects, age, date, birthDate } = require('./functions')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill all the fields.')
        }
    }

    let { profile_url, name, birth, gender, degree, specialization, subjects, class_type } = req.body

    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()
    birth = Date.parse(req.body.birth)

    data.teachers.push({
        id,
        profile_url,
        name,
        birth,
        gender,
        degree,
        specialization,
        subjects,
        class_type,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('File writing error.')

        return res.redirect('/teachers')
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.render('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        subjects: subjects(foundTeacher.subjects),
        created_at: date(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.render('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        birth: birthDate(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}