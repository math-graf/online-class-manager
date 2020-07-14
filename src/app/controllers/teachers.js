const Teacher = require('../../models/Teacher')
const { subjects, age, date, birthDate, classes } = require('../../lib/functions')
const db = require('../../config/db')

module.exports = {

    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)
        
        const params = {
            page,
            filter,
            limit,
            offset,
            callback(teachers) {

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }
                for (teacher of teachers) {
                    const vectorizedSubject = classes(teacher.subjects)
                    teacher.subjects = vectorizedSubject
                }
                return res.render('teachers/index', {teachers, filter, pagination})
            }
        }
        Teacher.paginate(params)
    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields.')
            }
        }
    
        Teacher.createTeacher(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res) {
        
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send('Teacher not found!')
    
            teacher.birth = age(teacher.birth)
            teacher.class_type = classes(teacher.class_type)
            teacher.subjects = subjects(teacher.subjects)
            teacher.created_at = date(Date(teacher.created_at))
    
            return res.render('teachers/show', {teacher})
        })
    },
    edit(req, res) {
        
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send('Teacher not found!')
    
            teacher.birth = birthDate(teacher.birth)
            teacher.class_type = classes(teacher.class_type)
    
            return res.render('teachers/edit', {teacher})
        })
    },
    put(req, res) {
        
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields.')
            }
        }
    
        Teacher.update(req.body, function() {
    
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        
        Teacher.delete(req.body.id ,function() {
            return res.redirect('/teachers')
        })
    }
}
