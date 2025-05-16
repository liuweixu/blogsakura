import pool from "../utils/mysql-pool.js";

const [rows] = await pool.query("SELECT * FROM user");

console.log(rows);
