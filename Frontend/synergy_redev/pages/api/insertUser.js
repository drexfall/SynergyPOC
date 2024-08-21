// pages/api/insertUser.js
import { openDb } from './db';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const db = await openDb();
    const user = req.body.User;

    try {
      await db.run(`
        INSERT INTO UserContext (
          Id, Email, Name, Token, UserRoles, UserPortals, IsGuestUser, IsAdmin, IsDeleted, PhotoId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        user.Id,
        user.Email,
        user.UserName,
        req.body.Token,
        user.UserRoleIds,
        user.UserPortals,
        user.IsGuestUser ? 1 : 0,
        user.IsSystemAdmin ? 1 : 0,
        0, // IsDeleted is false if data is returned
        user.PhotoId
      ]);

      res.setHeader('Set-Cookie', cookie.serialize('token', req.body.Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'strict',
        path: '/'
      }));

      res.status(200).json({ message: 'User inserted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
