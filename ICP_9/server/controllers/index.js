
module.exports = function (app, db) {
    let student_details = db.model('student_details');
    app.get('/student',(req,res)=>{
        let class_id = req.query.classid;
        student_details.find({ class_id : class_id }).exec((err, students) => {
            if (!err) {
                res.send({
                    result: "Success",
                    data: students
                });
            } else {
                res.send({
                    result: "Failure",
                    message: "Error in fetching students",
                    error: err
                });
            }
        });
    });

    app.get('/student/search',(req,res)=>{
        let search_text = req.query.searchtext;
        let search_by = req.query.searchby;
        let query = {};
        query[search_by] = { $regex: search_text, $options: 'i' };
        student_details.find(query).exec((err, students) => {
            if (!err) {
                res.send({
                    result: "Success",
                    data: students
                });
                console.log(students);
            } else {
                res.send({
                    result: "Failure",
                    message: "Error in fetching students list",
                    error: err
                });
            }
        });
    });

    app.post('/student/create',(req,res) => {
        let student = req.body;
        let stud_details = new student_details({
            class_id: student.class_id ,
            student_name: student.name,
            course_of_study: student.course_of_study,
            major: student.major,
            minor: student.minor,
            created_on:new Date(),
            updated_on:new Date()
        });
        stud_details.save((err, student) => {
            if (!err) {
                res.send({
                    result: "Success",
                    data: student
                });
            } else {
                res.send({
                    result: "Failure",
                    message: "Error in creating student",
                    error: err
                });
            }
        })
    });
};