import type { NextApiRequest, NextApiResponse } from 'next';
import { searchRecipes } from './search';

type Data = {
  body: string
  error: boolean
  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let request = req.body;
  let headers = req.headers;
  if (headers.key == undefined) {return res.status(400).json({body: "No auth key provided", error: true})}
  if (false) {return res.status(401).json({body: "Invalid auth key", error: true})}
  //check for POST request
    if (req.method === 'POST') {
        // Process a POST request
        if (request.type == "search") {
            searchRecipes(request.query)
        }
        else if (request.type == "new") {}
        else {
            res.status(400).json({ body: 'Invalid request type', error: true })
        }
    } else {
        // Handle any other HTTP method
        res.status(200).json({ body: 'Invalid request. Please use POST', error: true })
    }
}