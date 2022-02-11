import { Pool } from "pg";
import config from "../config";

const pool = new Pool(config.db);

// Create Table
const createTable = 'CREATE TABLE IF NOT EXISTS shopa-dropa-books (name varchar(64), author varchar(32), year smallint, isbn UUID PRIMARY KEY DEFAULT char(13));';
const res = await pool.query(createTable);
console.log("table creation", res);

export default pool;