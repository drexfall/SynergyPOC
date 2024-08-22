import { openDb } from './db';
import cookie from 'cookie';

export default async function handler(req, res) {
  const db = await openDb();

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const users = await db.all('SELECT * FROM UserContext WHERE Token = ?', [token]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found with the provided token' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}
