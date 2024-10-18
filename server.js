// server.js
/*const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createHash } = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mca',
  port : 3308
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
  
  // Create tables if they do not exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS note (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      msg VARCHAR(10000),
      time DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });

  db.query(createNotesTable, (err) => {
    if (err) throw err;
    console.log('Notes table created or already exists');
  });
});

// User authentication routes
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPw], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Username already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, hashedPw], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      res.json({ id: results[0].id });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Notes CRUD routes (with user_id filtering)
app.get('/api/notes/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM note WHERE user_id = ? ORDER BY time DESC', [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM note ORDER BY time DESC', (err, results) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.send(results);
    }
  });
});

app.post('/api/notes', (req, res) => {
  const { userId, msg } = req.body;
  db.query('INSERT INTO note (user_id, msg) VALUES (?, ?)', [userId, msg], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, msg, time: new Date() });
  });
});

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { msg } = req.body;
  db.query('UPDATE note SET msg = ? WHERE id = ?', [msg, id], (err, result) => {
    if (err) throw err;
    res.json({ id, msg });
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM note WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


*/

/*
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createHash } = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mca',
  port: 3308, // Your MySQL port
});

// Connect to Database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

  // Create Users Table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  // Create Notes Table
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS note (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      msg VARCHAR(10000),
      time DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });

  db.query(createNotesTable, (err) => {
    if (err) throw err;
    console.log('Notes table created or already exists');
  });
});

// User Signup
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPw], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'Username already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, hashedPw], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      res.json({ id: results[0].id });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Add Note (Insert)
app.post('/api/notes', (req, res) => {
  const { userId, msg } = req.body;
  db.query('INSERT INTO note (user_id, msg) VALUES (?, ?)', [userId, msg], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, msg, time: new Date() });
  });
});

// Get All Notes (Display)
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM note ORDER BY time DESC', (err, results) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      res.send(results);
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
*/


/*
// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createHash } = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mca',
  port: 3308, // Your MySQL port
});

// Connect to Database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

  // Create Users Table if not exists
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  // Create Notes Table if not exists
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS note (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      msg VARCHAR(10000),
      time DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });

  db.query(createNotesTable, (err) => {
    if (err) throw err;
    console.log('Notes table created or already exists');
  });
});

// User Signup Route
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPw], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Username already exists' });
      }
      console.error("Error inserting user: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// User Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, hashedPw], (err, results) => {
    if (err) {
      console.error("Error during login: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      return res.json({ id: results[0].id });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Add Note Route (Insert)
app.post('/api/notes', (req, res) => {
  const { userId, msg } = req.body;

  if (!userId || !msg) {
    return res.status(400).json({ error: 'Missing userId or msg' });
  }

  db.query('INSERT INTO note (user_id, msg) VALUES (?, ?)', [userId, msg], (err, result) => {
    if (err) {
      console.error("Error inserting note: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ id: result.insertId, msg, time: new Date() });
  });
});

// Get All Notes Route
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM note ORDER BY time DESC', (err, results) => {
    if (err) {
      console.error("Error fetching notes: ", err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
*/

/*
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createHash } = require('crypto');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mca',
  port: 3308, // Your MySQL port
});

// Connect to Database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

  // Create Users Table if not exists
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(64) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  // Create Notes Table if not exists
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS note (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      msg VARCHAR(10000),
      time DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });

  db.query(createNotesTable, (err) => {
    if (err) throw err;
    console.log('Notes table created or already exists');
  });
});

// User Signup Route
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPw], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Username already exists' });
      }
      console.error("Error inserting user: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// User Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const hashedPw = createHash('sha256').update(password).digest('hex');

  db.query('SELECT id FROM users WHERE username = ? AND password = ?', [username, hashedPw], (err, results) => {
    if (err) {
      console.error("Error during login: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    } else if (results.length > 0) {
      return res.json({ id: results[0].id });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Add Note Route (Insert)
app.post('/api/notes', (req, res) => {
  const { userId, msg } = req.body;

  if (!userId || !msg) {
    return res.status(400).json({ error: 'Missing userId or msg' });
  }

  db.query('INSERT INTO note (user_id, msg) VALUES (?, ?)', [userId, msg], (err, result) => {
    if (err) {
      console.error("Error inserting note: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ id: result.insertId, msg, time: new Date() });
  });
});

// Get All Notes Route
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM note ORDER BY time DESC', (err, results) => {
    if (err) {
      console.error("Error fetching notes: ", err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
*/


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mca',
  port: 3308, // Your MySQL port
});

// Connect to Database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

  // Create Notes Table if not exists
  const createNotesTable = `
    CREATE TABLE IF NOT EXISTS note (
      id INT NOT NULL AUTO_INCREMENT,
      msg VARCHAR(10000),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(createNotesTable, (err) => {
    if (err) throw err;
    console.log('Notes table created or already exists');
  });
});

// Add Note Route (Insert)
app.post('/api/notes', (req, res) => {
  const { msg } = req.body;

  if (!msg) {
    return res.status(400).json({ error: 'Missing msg' });
  }

  db.query('INSERT INTO note (msg) VALUES (?)', [msg], (err, result) => {
    if (err) {
      console.error("Error inserting note: ", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ id: result.insertId, msg, time: new Date() });
  });
});

// Get All Notes Route
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM note ', (err, results) => {
    if (err) {
      console.error("Error fetching notes: ", err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
