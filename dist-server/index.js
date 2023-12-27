import { __awaiter } from "tslib";
import express from 'express';
import cors from 'cors';
import { createServer } from "node:http";
import { Server } from 'socket.io';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';
const uploadsPath = './uploads';
const dataPath = './data';
export const expressApp = express();
const port = 3003;
fs.mkdirSync(uploadsPath, { recursive: true });
fs.mkdirSync(dataPath, { recursive: true });
expressApp.use(express.static('public'));
expressApp.use(express.static('dist'));
expressApp.use('/data-images', express.static(dataPath));
expressApp.use(bodyParser.json({ limit: '1000mb' }));
expressApp.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
};
expressApp.use(cors(corsOptions));
expressApp.use('/images', express.static(uploadsPath));
const server = createServer(expressApp);
export const expressAppIO = new Server(server, {
    cors: corsOptions
});
//enable * on CORS for socket.io
expressAppIO.sockets.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    // Logging all events
    socket.onAny((eventName, ...args) => {
        console.log(`event: ${eventName}`, args);
    });
});
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
expressApp.post('/files/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded: ${req.file.originalname}`);
});
import path from 'path';
// Function to check if the folder contains both an image and a .txt file
const findSubfoldersWithImagesAndText = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('path', folderPath);
    const subfolders = yield fs.promises.readdir(folderPath, { withFileTypes: true });
    console.log('subfolders', subfolders);
    const validFolders = [];
    for (const dirent of subfolders) {
        if (dirent.isDirectory()) {
            const files = yield fs.promises.readdir(path.join(folderPath, dirent.name));
            const hasImage = files.some(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
            const hasTextFile = files.some(file => file === 'tags.txt');
            const hasCaptionFile = files.some(file => file === 'caption.txt');
            if (hasImage && hasTextFile) {
                validFolders.push({ name: dirent.name, hasCaption: hasCaptionFile });
            }
        }
    }
    console.log('result', validFolders);
    return validFolders;
});
const checkForCaptionFile = (folderName) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.access(path.join(dataPath, folderName, 'caption.txt'), fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
});
// Route to find subfolders with images and text files
expressApp.get('/data-folder/scan', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folders = yield findSubfoldersWithImagesAndText(dataPath);
        res.json(folders);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
expressApp.get('/folder/:folderName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderName = req.params.folderName;
    const folderPath = path.join(dataPath, folderName);
    try {
        const files = yield fs.promises.readdir(folderPath);
        const imageFile = files.find(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        const tagFile = files.find(file => file === 'tags.txt');
        if (!imageFile || !tagFile) {
            return res.status(404).send('Image or text file not found.');
        }
        const captionFile = files.find(file => file === 'caption.txt');
        const caption = captionFile ? yield fs.promises.readFile(path.join(folderPath, captionFile), 'utf-8') : '';
        const tags = yield fs.promises.readFile(path.join(folderPath, tagFile), 'utf-8');
        // Send the image file and tags
        res.json({ imageUrl: `/data-images/${folderName}/${imageFile}`, tags: tags.split(',').map(tag => (tag.trim())), caption });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
expressApp.get('/folder/:folderName/caption', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderName = req.params.folderName;
    const folderPath = path.join(dataPath, folderName);
    const hasCaptionFile = yield checkForCaptionFile(folderName);
    if (!hasCaptionFile) {
        return res.status(404).send('Caption file not found.');
    }
    return res.status(200).send('Caption file found.');
}));
expressApp.post('/folder/:folderName/save-tags', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderName = req.params.folderName;
    const { tags } = req.body; // Assuming tags are sent as a comma-separated string
    const folderPath = path.join(dataPath, folderName);
    const textFile = `tags.txt`; // Assuming the text file has the same name as the folder
    try {
        yield fs.promises.writeFile(path.join(folderPath, textFile), tags);
        res.json({ message: 'Tags updated successfully.' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
expressApp.post('/folder/:folderName/save-caption', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderName = req.params.folderName;
    const { tags } = req.body; // Assuming tags are sent as a comma-separated string
    const folderPath = path.join(dataPath, folderName);
    const textFile = `caption.txt`; // Assuming the text file has the same name as the folder
    try {
        yield fs.promises.writeFile(path.join(folderPath, textFile), tags);
        res.json({ message: 'Tags updated successfully.' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// route that accepts an image, and creates a new folder with the image inside, and with a blank tags.txt file
expressApp.post('/folder/create', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const folderName = req.body.folderName;
    const folderPath = path.join(dataPath, folderName);
    const textFile = `tags.txt`; // Assuming the text file has the same name as the folder
    try {
        yield fs.promises.mkdir(folderPath);
        yield fs.promises.writeFile(path.join(folderPath, textFile), '');
        yield fs.promises.rename(path.join(uploadsPath, req.file.originalname), path.join(folderPath, req.file.originalname));
        res.json({ message: 'Folder created successfully.' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
