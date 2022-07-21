const fs = require('fs')
const path = require('path')

// File System
// fs.mkdir(path.join(__dirname, 'notes'), (err) => {
//     if (err) {
//         throw err;
//     }
//
//     console.log('Folder was created');
// });

// fs.writeFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'Hello World', (err => {
//     if (err) {
//         throw err;
//     }
//
//     console.log('File was created');
//     fs.appendFile(path.join(__dirname, 'notes', 'mynotes.txt'), ' From append File', err1 => {
//             if (err1) {
//                 throw err1;
//             }
//             console.log('File was edited');
//         }
//     );
// }));
//
// fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'utf-8',(err, data) => {
//     if (err) {
//         throw err;
//     }
//     // console.log(Buffer.from(data).toString());
//     console.log(data);
// });

fs.rename(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    err => {
        if (err) {
            throw err;
        }

        console.log('File was renamed');
    }
);