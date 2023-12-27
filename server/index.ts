import express from 'express';
import cors from 'cors';
import { createServer } from "node:http";
import { Server, Socket } from 'socket.io';
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
    cb(null, uploadsPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
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
const findSubfoldersWithImagesAndText = async (folderPath: string): Promise<{name: string, hasCaption: boolean}[]> => {
  console.log('path', folderPath);
  const subfolders = await fs.promises.readdir(folderPath, { withFileTypes: true });
  console.log('subfolders', subfolders);

  const validFolders: {name: string, hasCaption: boolean}[] = [];

  for (const dirent of subfolders) {
    if (dirent.isDirectory()) {
      const files = await fs.promises.readdir(path.join(folderPath, dirent.name));
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
};

const checkForCaptionFile = async (folderName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.access(path.join(dataPath, folderName, 'caption.txt'), fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// Route to find subfolders with images and text files
expressApp.get('/data-folder/scan', async (req, res) => {
  try {
    const folders = await findSubfoldersWithImagesAndText(dataPath);
    res.json(folders);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});


expressApp.get('/folder/:folderName', async (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(dataPath, folderName);

  try {
    const files = await fs.promises.readdir(folderPath);
    const imageFile = files.find(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    const tagFile = files.find(file => file === 'tags.txt');
    if (!imageFile || !tagFile) {
      return res.status(404).send('Image or text file not found.');
    }
    const captionFile = files.find(file => file === 'caption.txt');
    const caption = captionFile ? await fs.promises.readFile(path.join(folderPath, captionFile), 'utf-8') : '';

    const tags = await fs.promises.readFile(path.join(folderPath, tagFile), 'utf-8');
    
    // Send the image file and tags
    res.json({ imageUrl: `/data-images/${folderName}/${imageFile}`, tags: tags.split(',').map(tag => (tag.trim())), caption});
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

expressApp.get('/folder/:folderName/caption', async (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(dataPath, folderName);

  const hasCaptionFile = await checkForCaptionFile(folderName);
  if (!hasCaptionFile) {
    return res.status(404).send('Caption file not found.');
  }

  return res.status(200).send('Caption file found.');
})

expressApp.post('/folder/:folderName/save-tags', async (req, res) => {
  const folderName = req.params.folderName;
  const { tags } = req.body; // Assuming tags are sent as a comma-separated string
  const folderPath = path.join(dataPath, folderName);
  const textFile = `tags.txt`; // Assuming the text file has the same name as the folder

  try {
      await fs.promises.writeFile(path.join(folderPath, textFile), tags);
      res.json({ message: 'Tags updated successfully.' });
  } catch (error: any) {
      res.status(500).send(error.message);
  }
});

expressApp.post('/folder/:folderName/save-caption', async (req, res) => {
  const folderName = req.params.folderName;
  const { tags } = req.body; // Assuming tags are sent as a comma-separated string
  const folderPath = path.join(dataPath, folderName);
  const textFile = `caption.txt`; // Assuming the text file has the same name as the folder

  try {
      await fs.promises.writeFile(path.join(folderPath, textFile), tags);
      res.json({ message: 'Tags updated successfully.' });
  } catch (error: any) {
      res.status(500).send(error.message);
  }
})