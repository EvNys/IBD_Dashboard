import pool from '../../../lib/db';

export async function GET(req) {
  try {
    const result = await pool.query('SELECT * FROM "Dashboard"."Alunos"'); 
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

