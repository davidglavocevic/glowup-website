const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

const data = JSON.parse(fs.readFileSync("data.json"))

let bookings=[]

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
height:80vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:black;
text-align:center;
}

.logo{
width:260px;
margin-bottom:20px;
}

.subtitle{
font-size:20px;
opacity:0.8;
}

.btn{
margin-top:25px;
padding:15px 30px;
background:#D4AF37;
border:none;
border-radius:8px;
cursor:pointer;
font-weight:bold;
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

.gallery{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:15px;
}

.gallery img{
width:100%;
border-radius:10px;
}

form{
display:flex;
flex-direction:column;
gap:15px;
max-width:400px;
}

input,select{
padding:10px;
border:none;
border-radius:6px;
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

<h2>Vorher / Nachher</h2>

<div class="gallery">

<img src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023">
<img src="https://images.unsplash.com/photo-1542365887-8f27d99a1f20">
<img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9">

</div>

</div>

<div class="section">

<h2>Termin buchen</h2>

<form action="/book" method="post">

<input name="name" placeholder="Name" required>

<input name="phone" placeholder="Telefon">

<select name="service">

${data.services.map(s=>`<option>${s.name}</option>`).join("")}

</select>

<input type="date" name="date">

<button class="btn">Termin senden</button>

</form>

</div>

<div class="section">

<h2>Standort</h2>

<iframe width="100%" height="300"
src="https://maps.google.com/maps?q=Wiesbaden&t=&z=13&ie=UTF8&iwloc=&output=embed">
</iframe>

</div>

<footer>

${data.company} • ${data.city}

</footer>

</body>
</html>

`)

})

app.post("/book",(req,res)=>{

bookings.push(req.body)

res.send("Termin Anfrage erhalten")

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server läuft")

})
