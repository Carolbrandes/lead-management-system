import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    linkedIn: string;
    visas: string[];
    resume?: string;
    additionalInfo: string;
    createdAt: string;
    updatedAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const leadsData = fs.readFileSync(leadsFilePath, 'utf8');
            const leads: Lead[] = JSON.parse(leadsData);

            const leadIndex = leads.findIndex((lead: Lead) => lead.id === id);
            if (leadIndex === -1) {
                return res.status(404).json({ message: 'Lead not found' });
            }

            const updatedLead = {
                ...leads[leadIndex],
                ...req.body,
                updatedAt: new Date().toISOString(),
            };

            leads[leadIndex] = updatedLead;

            fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2));
            res.status(200).json(updatedLead);
        } catch (error) {
            console.error("Error updating lead:", error);
            res.status(500).json({ message: 'Error updating lead' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}