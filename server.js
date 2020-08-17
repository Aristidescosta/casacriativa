//Area de declaração de variáveis
const express = require('express')
const server = express()

//Configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//
server.use(express.urlencoded({extend: true}))


const db = require('./db')

// const ideias = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
//         url: "https://rocketseat.com.br"
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
//         url: "https://rocketseat.com.br"
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
//         url: "https://rocketseat.com.br",
//     },

//     {
//         img: "https://image.flaticon.com/icons/svg/2972/2972138.svg",
//         title: "Pintura",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
//         url: "https://rocketseat.com.br",
//     },
    
//     {
//         img: "https://image.flaticon.com/icons/png/512/3171/3171657.png",
//         title: "Recortes",
//         category: "Criatividade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ad deserunt et provident pariatur non neque magni consequuntur officiis at facilis cumque ipsam quidem aliquid, odit dolore veritatis vel autem?",
//         url: "https://rocketseat.com.br",
//     },
// ]


//Configurando o Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("views",{
    express: server,
    noCache: true, //boolean

})


server.get('/',function(req, res){
    db.all(`SELECT * FROM last_ideias`, function(err, rows){
        if(err){
            console.log(err)

            res.send("Erro no banco de dados")
        }

        const reverse_ideias = [...rows].reverse()
    
        let lasts = []
        for(let ideia of reverse_ideias){
            if(lasts.length < 2){
                lasts.push(ideia)
            }
            
        }

        return res.render("index.html", {ideias: lasts})
        
    })


})

server.get('/ideias',function(req, res){
    db.all(`SELECT * FROM last_ideias`, function(err, rows){
        if(err){
            console.log(err)

            res.send("Erro no banco de dados")
        }
			
        const reverse_ideias = [...rows].reverse()

        return res.render("ideias.html", {ideias: reverse_ideias})
        
    })
    
})

server.post('/', function (req, res) {

    //Inserir dados na tabela
    
    const query = `
        INSERT INTO last_ideias(
            image,
            title,
            category, 
            description,
            link
        ) VALUES (?,?,?,?,?)
        `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
 
    db.run(query, values, function(err){
        if(err){
            console.log(err)

            res.send("Erro no banco de dados")
        }

        return res.redirect('/ideias')
    })

})


//Ouvindo a porta 80
server.listen(8081, function(req, res){
    console.log('Servidor rodando')
})