const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, name TEXT NOT NULL, color TEXT NOT NULL DEFAULT '#6366f1', icon TEXT NOT NULL DEFAULT 'Tag', type TEXT NOT NULL CHECK(type IN ('income','expense','both')) DEFAULT 'both', created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  amount NUMERIC(14,2) NOT NULL CHECK(amount > 0), date DATE NOT NULL, type TEXT NOT NULL CHECK(type IN ('income','expense')),
  description TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'paid' CHECK(status IN ('paid','pending')), created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  month DATE NOT NULL, amount NUMERIC(14,2) NOT NULL CHECK(amount > 0), UNIQUE(user_id, category_id, month)
);`;

async function migrate() {
  await pool.query(schema);
  const user = await pool.query('SELECT id FROM users WHERE email=$1', ['demo@financeiro.app']);
  if (!user.rowCount) {
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('demo123', 10);
    const created = await pool.query('INSERT INTO users(email,name,password_hash) VALUES($1,$2,$3) RETURNING id', ['demo@financeiro.app', 'Usuário Demo', hash]);
    const id = created.rows[0].id;
    const categories = [['Salário','#22c55e','Wallet','income'],['Investimentos','#14b8a6','TrendingUp','income'],['Alimentação','#f97316','Utensils','expense'],['Moradia','#8b5cf6','Home','expense'],['Transporte','#3b82f6','Car','expense'],['Lazer','#ec4899','Smile','expense']];
    for (const c of categories) await pool.query('INSERT INTO categories(user_id,name,color,icon,type) VALUES($1,$2,$3,$4,$5)', [id, ...c]);
    const cats = await pool.query('SELECT id,name FROM categories WHERE user_id=$1', [id]);
    const byName = Object.fromEntries(cats.rows.map(c => [c.name, c.id]));
    const now = new Date(); const month = now.toISOString().slice(0,7);
    const tx = [[5000,'income','Salário','Salário mensal'],[750,'expense','Moradia','Aluguel'],[420,'expense','Alimentação','Mercado'],[180,'expense','Transporte','Combustível'],[250,'expense','Lazer','Cinema e restaurantes']];
    for (const [amount,type,cat,description] of tx) await pool.query('INSERT INTO transactions(user_id,category_id,amount,date,type,description,status) VALUES($1,$2,$3,$4,$5,$6,$7)', [id,byName[cat],amount,`${month}-05`,type,description,'paid']);
  }
}

module.exports = { pool, migrate };
