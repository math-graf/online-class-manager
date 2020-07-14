const db = require('../config/db')
const { birthDate } = require('../lib/functions')

module.exports = {
    selectAll(callback) {

        db.query(`SELECT * 
        FROM my_student 
        ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { limit, offset, filter, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(SELECT count(*) 
            FROM my_student) AS total`
        
        if (filter) {
            filterQuery = `
            WHERE my_student.name ILIKE '%${filter}%' 
            OR my_student.email ILIKE '%${filter}%'`

            totalQuery = `(SELECT count(*) FROM my_student
            ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT my_student.*, ${totalQuery} 
        FROM my_student
        ${filterQuery}
        LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    createStudent(data, callback) {
        const query = `
        INSERT INTO my_student (
            profile_url,
            name,
            email,
            birth,
            gender,
            grade,
            time,
            created_at,
            teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
    `

        const values = [
            data.profile_url,
            data.name,
            data.email,
            birthDate(data.birth),
            data.gender,
            data.grade,
            data.time,
            birthDate(Date.now()),
            data.teacher_id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows[0])
        })
    },
    selectTeacherOptions(callback) {

        db.query(`SELECT name, id FROM my_teacher`, function(err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })

    },
    find(id, callback) {

        db.query(`SELECT my_student.*, my_teacher.name AS teacher_name
        FROM my_student
        LEFT JOIN my_teacher ON (my_student.teacher_id = my_teacher.id)
        WHERE my_student.id = $1`, [id], function (err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        
        db.query(`SELECT * FROM my_student
        WHERE my_student.name ILIKE '%${filter}%'
        ORDER BY my_student.name`, function(err, results) {
            if (err) throw `Database error!${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {

        const query = `
            UPDATE my_student SET
                profile_url=$1,
                name=$2,
                email=$3
                birth=$4,
                gender=$5,
                grade=$6,
                time=$7,
                teacher_id=$8
            WHERE id = $9
        `

        const values = [
            data.profile_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.grade,
            data.time,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database error!${err}`

            callback()
        })
    },
    delete(id, callback) {

        db.query(`
        DELETE FROM my_student 
        WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database error!${err}`

            callback()
        })
    }
}