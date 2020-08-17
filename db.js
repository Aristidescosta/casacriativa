const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database('./casacriativa.db')

db.serialize(function(){

    //Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS last_ideias(
            id INTEGER PRIMARY KEY  AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)


    //Deletar dado na tabela
    // db.run(`DELETE FROM last_ideias WHERE title = ?`, ["safasdf"], function(err){
        // if(err) return console.log(err)

        // console.log("TABELA DELETADA", this)
    // })

    //Inserir dados na tabela
    
    // const query = `
    // INSERT INTO last_ideias(
    //     image,
    //     title,
    //     category, 
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?)
    // `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Cursos de programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
    //     "https://rocketseat.com.br"
    // ]

    // db.run(query, values, function(err){
    //     if(err) return console.log(err)

    //     console.log(this)
    // })

})

module.exports = db