import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Configure sua string de conexão no .env
});

export default pool;