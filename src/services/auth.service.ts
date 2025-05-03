import { db } from './db';
export const authService = {
  async login(username: string, password: string) {
    try {
      const [user]: any = await db.query('SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1', [username, password]);
      return user || null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  async register(username: string, email: string, password: string) {
    try {
      await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};