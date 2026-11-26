
import { loadData } from '../server/data.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const data = await loadData(process.env);

    return res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);

    return res.status(502).json({
      error: error.message,
    });
  }
}
  