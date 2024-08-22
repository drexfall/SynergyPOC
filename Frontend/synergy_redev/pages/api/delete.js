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
    const result = await db.run('DELETE FROM UserContext WHERE Token = ?', [token]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'No users found with the provided token' });
    }

    res.setHeader('Set-Cookie', Object.keys(cookies).map(name => cookie.serialize(name, '', { maxAge: 0, path: '/' })));
    
    res.status(200).json({ message: 'Token record deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete token record' });
  }
}
