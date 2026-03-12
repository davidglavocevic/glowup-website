const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.static(__dirname))

const data = JSON.parse(fs.readFileSync("data.json"))

app.get("/",(req,res)=>{

res.send(`

<!DOCTYPE html>
<html lang="de">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${data.company}</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">

<style>

body{
margin:0;
font-family:Poppins;
background:#0f0f0f;
color:white;
}

header{
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:80vh;
background:black;
text-align:center;
}

.logo{
width:260px;
margin-bottom:20px;
}

.subtitle{
opacity:0.8;
font-size:20px;
}

.btn{
margin-top:25px;
padding:15px 30px;
background:#D4AF37;
border:none;
border-radius:8px;
font-weight:bold;
cursor:pointer;
}

.section{
max-width:1100px;
margin:auto;
padding:60px 20px;
}

.services{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:25px;
}

.card{
background:#1a1a1a;
padding:25px;
border-radius:12px;
border:1px solid #333;
}

.price{
color:#D4AF37;
font-size:22px;
margin-top:10px;
}

footer{
text-align:center;
padding:40px;
background:black;
}

</style>

</head>

<body>

<header>

<img src="/logo.svg" class="logo">

<div class="subtitle">
Mobile Innenraum & Möbelreinigung in ${data.city}
</div>

<a href="https://wa.me/${data.phone}">
<button class="btn">WhatsApp Termin</button>
</a>

</header>

<div class="section">

<h2>Unsere Services</h2>

<div class="services">

${data.services.map(s=>`

<div class="card">

<h3>${s.name}</h3>

<p>${s.desc}</p>

<div class="price">${s.price}</div>

</div>

`).join("")}

</div>

</div>

<div class="section">

<h2>Einsatzgebiet</h2>

<ul>

${data.locations.map(l=>`<li>${l}</li>`).join("")}

</ul>

</div>

<footer>

${data.company} • ${data.city}

</footer>

</body>
</html>

`)

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server läuft auf Port "+PORT)

})
