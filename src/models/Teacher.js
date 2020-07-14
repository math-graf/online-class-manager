const db = require('../config/db')
const { birthDate } = require('../lib/functions')

module.exports = {
    selectAll(callback) {

        db.query(`SELECT my_teacher.*, count(my_student) AS total_students
        FROM my_teacher
        LEFT JOIN my_student ON (my_teacher.id = my_student.teacher_id)
        GROUP BY my_teacher.id
        ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { limit, offset, filter, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(SELECT count(*) FROM my_teacher) AS total`

        if (filter) {
            filterQuery = `
            WHERE my_teacher.name ILIKE '%${filter}%'
            OR my_teacher.subjects ILIKE '%${filter}%'`

            totalQuery = `(SELECT count(*) FROM my_teacher
            ${filterQuery}) AS total`
        }
        query = `SELECT my_teacher.*, ${totalQuery}, COUNT(my_student) AS total_students
        FROM my_teacher
        LEFT JOIN my_student ON (my_teacher.id = my_student.teacher_id)
        ${filterQuery}
        GROUP BY my_teacher.id
        ORDER BY total_students DESC
        LIMIT $1
        OFFSET $2`

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    createTeacher(data, callback) {
        const query = `
        INSERT INTO my_teacher (
            profile_url,
            name,
            birth,
            gender,
            degree,
            specialization,
            subjects,
            class_type,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
    `

        const values = [
            data.profile_url,
            data.name,
            birthDate(data.birth),
            data.gender,
            data.degree,
            data.specialization,
            data.subjects,
            (data.class_type).toString(),
            birthDate(Date.now())
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {

        db.query(`SELECT * 
        FROM my_teacher 
        WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        
        db.query(`SELECT my_teacher.*, count(my_student) AS total_students
        FROM my_teacher
        LEFT JOIN my_student ON (my_teacher.id = my_student.teacher_id)
        WHERE my_teacher.name ILIKE '%${filter}%'
        OR my_teacher.subjects ILIKE '%${filter}%'
        GROUP BY my_teacher.id
        ORDER BY total_students DESC`, function(err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {

        const query = `
            UPDATE my_teacher SET
                profile_url=$1,
                name=$2,
                birth=$3,
                gender=$4,
                degree=$5,
                specialization=$6,
                subjects=$7,
                class_type=$8
            WHERE id = $9
        `

        const values = [
            data.profile_url,
            data.name,
            data.birth,
            data.gender,
            data.degree,
            data.specialization,
            data.subjects,
            data.class_type,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database error!${err}`

            callback()
        })
    },
    delete(id, callback) {

        db.query(`
        DELETE FROM my_teacher 
        WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database error!${err}`

            callback()
        })
    }
}