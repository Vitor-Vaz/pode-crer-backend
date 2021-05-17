const Database = require('./config');

const initDb = {

  async init() {
    const db = await Database();

    await db.exec(` CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        login TEXT,
        password TEXT,
        email TEXT,
        coins INT
)`);

    await db.exec(`CREATE TABLE dream (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        donates INT,
        goal INT,
        created_at DATETIME
        
)`);

    await db.run(`INSERT INTO user (
            name,
            avatar,
            login,
            password,
            email,
            coins
    ) VALUES (
            "Nicolas Cardia",
            "https://www.github.com/nicolascardia.png",
            "nicDaBalada",
            "nicao2020",
            "nicolas.cardia@gmail.com",
            "1000"
);`);

    await db.run(`INSERT INTO dream (
            name,
            description,
            donates,
            goal,
            created_at
    ) VALUES (
            "Cirurgia para a mãe",
            "Minha mãe tá morrendo socorro precisamos de grana",
            0,
            1000,
            1617514376018
);`);

    await db.run(`INSERT INTO dream (
        name,
        description,
        donates,
        goal,
        created_at
    ) VALUES (
        "Cirurgia pro cachorro ;-;",
        "Meu cachorro tá com doença na artrose me ajudaaaaaa",
        0,
        5000,
        1617514376018
);
`);

    await db.close();
  },
};

initDb.init();
