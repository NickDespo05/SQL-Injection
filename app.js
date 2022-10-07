const http = require(`http`),
    path = require(`path`),
    express = require(`express`),
    bodyParser = require(`body-parser`);
const sqlite3 = require(`sqlite3`).verbose();
const app = express();
app.use(express.static(`.`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database(`:memory:`);
db.serialize(function () {
    db.run(`CREATE TABLE user (username TEXT, password TEXT, title TEXT)`);
    db.run(
        "INSERT INTO user VALUES (`privilegedUser`, `privilegedUser`, `Administrator`)"
    );
});

app.use("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/", (req, res) => {
    db.get(
        "SELECT title FROM user where username = '" +
            username +
            "' and password = '" +
            password +
            "'",
        () => {
            if (error) {
                console.log(error);
                res.redirect("/index.html");
            } else if (!row) {
                res.redirect("index.html#error");
            } else {
                res.send("secret data so shush ");
            }
        }
    );
});

app.listen(3000, () => {
    console.log("connected to port");
});
