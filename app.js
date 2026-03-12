const express = require("express")
const fs = require("fs")

const app = express()

const data = JSON.parse(fs.readFileSync("data.json"))

app.get("/", (req,res)=>{

res.send(`

<!DOCTYPE html>
<html>
<head>

<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${data.company}</title>

<style>

body{
margin:0;
font-family:Arial;
background:#111;
color:white;
}

header{
text-align:center;
padding:60px;
background:black;
}

h1{
color:#f5c518;
font-size:48px;
}

.section{
max-width:1100px;
margin:auto;
padding:40px;
}

.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:#1c1c1c;
padding:25px;
border-radius:10px;
}

.price{
color:#f5c518;
font-size:20px;
margin-top:10px;
}

button{
background:#f5c518;
border:none;
padding:15px 25px;
border-radius:8px;
cursor:pointer;
}

footer{
text-align:center;
padding:30px;
background:black;
}

</style>

</head>

<body>

<header>

<h1>${data.company}</h1>

<p>Mobile Innenraumreinigung</p>

<p>${data.city} & Umgebung</p>

</header>

<div class="section">

<h2>Services</h2>

<div class="cards">

${data.services.map(s=>`

<div class="card">

<h3>${s.name}</h3>

<p>${s.description}</p>

<div class="price">${s.price}</div>

</div>

`).join("")}

</div>

</div>

<div class="section">

<h2>Termin buchen</h2>

<a href="https://wa.me/${data.whatsapp}">
<button>WhatsApp Termin</button>
</a>

</div>

<footer>

${data.company}

</footer>

</body>
</html>

`)

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{

console.log("Server läuft auf Port "+PORT)

})
