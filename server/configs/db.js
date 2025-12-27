import { neon } from '@neondatabase/serverless';

// Create NeonDB client
const sql = neon(`${process.env.DATABASE_URL}`);

export default sql; //  default export
