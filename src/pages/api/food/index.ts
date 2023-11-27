// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  body: string
  error: boolean
  
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let request = req.body;
  //check for POST request
    if (req.method === 'POST') {
        // Process a POST request
    } else {
        // Handle any other HTTP method
        res.status(200).json({ body: 'Invalid request. Please use POST', error: true })
    }
}