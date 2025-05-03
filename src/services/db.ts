import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  // Replace with your MySQL username
  password: '',
  // Replace with your MySQL password
  database: 'police_impound',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export const db = {
  async query(sql: string, params?: any[]) {
    try {
      const [results] = await pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
};
// Initialize database tables
export const initDatabase = async () => {
  try {
    // Users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    // Vehicles table
    await db.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        plate VARCHAR(255) NOT NULL,
        vin VARCHAR(255) NOT NULL,
        case_number VARCHAR(255) UNIQUE NOT NULL,
        impound_date DATETIME NOT NULL,
        location VARCHAR(255) NOT NULL,
        status ENUM('HELD', 'PROCESSING', 'RELEASABLE') NOT NULL,
        image_url TEXT,
        driver_name VARCHAR(255),
        driver_license VARCHAR(255),
        impound_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    // Audit trail table
    await db.query(`
      CREATE TABLE IF NOT EXISTS audit_trail (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        action_type VARCHAR(255) NOT NULL,
        details TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    // Create default user if not exists
    const defaultUser = {
      username: 'user',
      password: 'admin123!',
      // In production, this should be hashed
      email: 'admin@example.com'
    };
    await db.query(`
      INSERT IGNORE INTO users (username, email, password)
      VALUES (?, ?, ?)
    `, [defaultUser.username, defaultUser.email, defaultUser.password]);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};