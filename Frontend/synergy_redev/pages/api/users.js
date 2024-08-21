import { openDb } from './db';

export default async function handler(req, res) {
  const db = await openDb();
  const users = await db.all('SELECT * FROM UserContext');
  res.status(200).json(users);
}
