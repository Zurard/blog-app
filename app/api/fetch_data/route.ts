// export async function POST(request: Request) {
//     const formData = await request.formData()
//     const title = formData.get('title')
//     const author = formData.get('author')
//     const content = formData.get('content')
//     return Response.json({ title, author, content })
//   }

// export const dynamic = 'force-static'
 
// export async function GET() {
//     return Response.json({ 'title ': 'the diaries' })
// }

// // import { NextApiRequest, NextApiResponse } from 'next';
// // // import { pool } from '../../lib/db'; // Your database connection logic

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method === 'POST') {
// //     try {
// //       const { title,authorId,content,createdAt } = req.body; // Extract data from request body
// //       const query = 'INSERT INTO your_table_name (title,authorId,content,createdAt) VALUES ($1, $2 ,$3 ,$4)';
// //       const values = [title,authorId,content,createdAt];

// //       // Execute the query to insert data into the database
// //       const result = await pool.query(query, values)

// //       res.status(200).json({ message: 'Data submitted successfully', data: result.rows });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Internal Server Error' });
// //     }
// //   } else {
// //     res.status(405).json({ message: 'Method Not Allowed' });
// //   }
// // }
