import pool from "../utils/mysql-pool.js";

const [rows] = await pool.query("SELECT * FROM test");

console.log(rows);
