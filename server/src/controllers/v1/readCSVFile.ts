import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import csvParser from 'csv-parser';
import { csv } from '../../models/CSVSchems';

const router = express.Router();

const upload = multer({ dest: `${__dirname}/uploads` });

router.route('/').post(upload.single('csvFile'), async (req: Request, res: Response) => {
  if (!req.file) return;
  const [, extension] = req.file.originalname.split('.') || '';
  if (extension !== 'csv') {
    console.error('Invalid file type');
    res.status(500).send('Invalid file type');
  }
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', data => {
      results.push(data);
    })
    .on('error', error => {
      console.error('Error reading the file:', error);
      res.status(500).send('Error reading the file');
    })
    .on('end', async () => {
      try {
        await csv.insertMany(results);
        res.status(200).json(results);
      } catch (err) {
        console.error('Error saving data to database:', err);
        res.status(500).send('Error saving data to database');
      } finally {
        fs.unlink(filePath, err => {
          if (err) console.error('Error deleting the file:', err);
        });
      }
    });
});

export default router;
