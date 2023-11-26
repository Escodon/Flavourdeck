// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { authUser } from './db';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let request = req.body;
  //check for POST request
    if (req.method === 'POST') {
        // Process a POST request
        if (request.type === 'login') {
          authUser(request.email, request.password)

        } else if (request.type === 'register') {

        } else {
            res.status(400).json({ error: 'Invalid request type' })
        }
    } else {
        // Handle any other HTTP method
        res.status(200).json({ Error: 'Invalid request. Please use POST' })
    }
}