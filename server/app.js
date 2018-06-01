
const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/userAvatars/");
    },
    filename: function(req, file, cb) {
        cb(null, Math.random().toFixed(2) + "_"+file.originalname);
    }
})
const upload = multer({storage: storage});
const app = express();
const jsonParser = bodyParser.json();

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "heineken"
});

conn.connect((err) => {
    if(err) {
        throw err;
    }
})

app.use(cors());
app.use('/uploads/userAvatars',express.static("uploads/userAvatars"));

app.listen(4000, () => {
    console.log("Listening on port 4000");
})

app.get("/", (req, res) => {
    res.send("Nothing to show here :)")
})

app.post("/korisnici/dodajKorisnika", upload.single("avatar"), (req, res) => {
    if (!req.body || !req.body.ime || !req.body.prezime || !req.body.email || !req.body.telefon) {
        return res.send("Morate popuniti sva polja!");
    }
    const avatar = req.file? req.file.filename : "no_avatar.png"; 
    const { ime, prezime, email, telefon } = req.body;


    const INSERT_NEW_USER = `INSERT INTO korisnici 
    (Ime, Prezime, Email, Telefon, Lozinka, Avatar) 
    VALUES ("${ime}", "${prezime}", "${email}", "${telefon}", "testuser", "${avatar}")`;

    if(!checkEmailValidity(email)) {
        return res.send("Email adresa je zauzeta");
    }

    conn.query(INSERT_NEW_USER, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send("Uspesno dodat korisnik");
        }
    })
})

app.post("/korisnici/ukloniKorisnika", jsonParser, (req, res) => {
    const {userId} = req.body;
    const DELETE_USER = `DELETE FROM korisnici WHERE id = ${userId}`;

    if(!userId) return res.send("ID nije validan");

    conn.query(DELETE_USER, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(`Korisnik ID ${userId} uspesno uklonjen`);
        }
    })
})

app.put("/korisnici/izmeniKorisnika/:id", jsonParser, (req, res) => {
    const userId = parseInt(req.params.id);
    if (userId) {
        const { ime, prezime, email, telefon } = req.body;
        const UPDATE_USER = `UPDATE korisnici SET
                                ime="${ime}", prezime="${prezime}", email="${email}", telefon="${telefon}"
                                WHERE id=${userId}`;

        conn.query(UPDATE_USER, (err) => {
            if (err) {
                return res.send(err)
            } else {
                res.send(`Korisnik ID ${userId} uspesno izmenjen`);
            }
        })
    }
})

app.get("/korisnici/listaKorisnika", (req, res) => {
    const SELECT_ALL_USERS = "SELECT * FROM korisnici";

    conn.query(SELECT_ALL_USERS, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    })
})

function checkEmailValidity(email) {
    const CHECK_EMAIL_SLOT = `SELECT * FROM korisnici WHERE email="${email}" `;
    conn.query(CHECK_EMAIL_SLOT, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            if (!result.length) return false;
            return true;
        }
    })
}