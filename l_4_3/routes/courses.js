const {Router} = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', async (req, res) => {
    // const courses = await Course.find().populate('userId');
    // const courses = await Course.find().populate('userId', 'email name');
    // const courses = await Course.find().populate('userId').select('name email');
    const courses = await Course.find();

    console.log(courses);

    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    });
});

router.post('/edit', auth, async (req, res) => {
    const {id} = req.body;
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id
        });
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }

});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
});

module.exports = router;