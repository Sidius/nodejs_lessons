const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const e = require("express");

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid.v4();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id,
        };
    }

    static async update(course) {
        const courses = await Course.getAll();

        const idx = courses.findIndex(c => c.id === course.id);
        courses[idx] = course;

        return Course.saveToDatabase(courses);
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        // console.log('Courses', courses);
        return Course.saveToDatabase(courses);
    }

    static saveToDatabase(courses) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        });
    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(c => c.id === id);
    }
}

module.exports = Course;