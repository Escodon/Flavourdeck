// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { authUser, newUser } from './db';

type Data = {
  body: string
  email? : any
  UID? : any
  error? :boolean
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
          newUser(request.email, request.password)
          res.status(200).json({body: "Sucsess", email: request.email, UID: request.uid})
        } else {
            res.status(400).json({ body: 'Invalid request type' })
        }
    } else {
        // Handle any other HTTP method
        res.status(200).json({ body: 'Invalid request. Please use POST', error: true })
    }
}