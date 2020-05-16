import { Pool } from "pg";

const pool = new Pool()

export function query(text: string, params?: Array<any>) {
  if (params) {
    return pool.query(text, params);
  } else {
    return pool.query(text);
  }
  
}