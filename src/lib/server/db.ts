import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USER
} from '$env/static/private';
import postgres from 'postgres';

const sql = postgres({
	host: DATABASE_HOST,
	port: 5432,
	database: DATABASE_NAME,
	username: DATABASE_USER,
	password: DATABASE_PASSWORD,
	ssl: 'require'
});

export default sql;
