import { Fields, Files, IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    linkedIn: string;
    country: string;
    visas: string[];
    resumePath: string | null;
    additionalInfo: string;
    status: string;
    createdAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const leadsData = fs.readFileSync(leadsFilePath, 'utf8');
            const leads = JSON.parse(leadsData);
            res.status(200).json(leads);
        } catch (error) {
            console.error("Error reading leads:", error);
            res.status(500).json({ message: 'Error reading leads data' });
        }
    } else if (req.method === 'POST') {
        try {
            const form = new IncomingForm({
                uploadDir,
                keepExtensions: true,
                filename: (name, ext) => `${Date.now()}${ext}`,
            });

            const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve([fields, files]);
                });
            });

            const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
            const resumePath = resumeFile ? `/uploads/${path.basename(resumeFile.filepath)}` : null;


            const getStringField = (field: string | string[] | undefined): string => {
                return Array.isArray(field) ? field[0] : field || '';
            };

            const getStringArrayField = (field: string | string[] | undefined): string[] => {
                if (!field) return [];
                return Array.isArray(field) ? field : [field];
            };

            const newLead: Lead = {
                id: Date.now().toString(),
                firstName: getStringField(fields.firstName),
                lastName: getStringField(fields.lastName),
                email: getStringField(fields.email),
                linkedIn: getStringField(fields.linkedIn),
                country: getStringField(fields.country),
                visas: getStringArrayField(fields.visas),
                resumePath,
                additionalInfo: getStringField(fields.additionalInfo),
                status: 'PENDING',
                createdAt: new Date().toISOString(),
            };

            const leadsData = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
            const leads: Lead[] = JSON.parse(leadsData);
            leads.push(newLead);
            fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2));

            return res.status(201).json(newLead);
        } catch (error) {
            console.error('Error creating lead:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}