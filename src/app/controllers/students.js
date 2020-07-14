const Student = require('../../models/Student')
const { date } = require('../../lib/functions')

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
            callback(students) {

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render('students/index', {students, filter, pagination})
            }
        }
        Student.paginate(params)        
    },
    create(req, res) {

        Student.selectTeacherOptions(function(teacherOptions) {
            if (!teacherOptions) res.send('Teacher not found!')

            return res.render('students/create', { teacherOptions })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields.')
            }
        }
    
        Student.createStudent(req.body, function(student) {
            if (!student) return res.send('Student not found!')

            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            student.birth = date(student.birth)

            return res.render('students/show', { student })
        })
    },
    edit(req, res) {
        
        Student.find(req.params.id, function(student) {
            if (!student) return res.send('Student not found!')

            Student.selectTeacherOptions(function(teacherOptions) {
                if (!teacherOptions) res.send('Teacher not found!')
    
                return res.render('students/edit', { teacherOptions, student })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all the fields.')
            }
        }
        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        
        Student.delete(req.body.id, function() {
            return res.redirect('/students')
        })
    }
}

