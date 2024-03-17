const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'}
]

app.get('/', (req, res) => {
    res.send('Hello, world!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
})

app.post('/api/courses', (req, res) =>{
    //if (!req.body.name || req.body.name.length <3) return res.status(404).send('Name is required');
    
    const result = validateCourse(req.body);
    if (result.error)   return res.status(400).send(result.error.details[0].message)

    const course = {
        id: courses.length +1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) return res.status(404).send('Course with given id not found')

    const result = validateCourse(req.body);
    if (result.error)   return res.status(400).send(result.error.details[0].message)

    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course with given id not found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course) {
    
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required()
    })
    return schema.validate(course);
}

app.listen(port, () => console.log(`listening on port ${port}`));
