const fs = require('fs')
const data = require('./data.json')
const { subjects, age, date, birthDate, classes } = require('./functions')

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
        created_at: date(foundTeacher.created_at),
        class_type: classes(foundTeacher.class_type)
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

exports.put = function(req, res) {
    const { id } = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) {
        return res.send('Teacher not found!')
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('File writing error!')

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('File writing error!')

        return res.redirect(`/teachers`)
    })
}