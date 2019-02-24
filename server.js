let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let port = 3000;
let route = require('./server.home')

// install Formidable npm package

let mime = {
    '.html' : 'text/html',
    '.css'  : 'text/css',
    '.pgn'  :  'text/pgn'
}

let server = http.createServer((req,res) => {
    
   if(req.url === '/') {
      fs.readFile('login.html',(err,data) => {
          if(err) {
              console.log('Have a some Error!')
          } else {
              res.writeHead(200, {
                  'Content-Type' : mime
              })
              res.write(data)
              res.end()
          }
      })
   } else if(req.url.match('\.css')) {
       let file = path.join(__dirname, 'css',req.url)
       let StreamFile = fs.createReadStream(file,'utf-8',req.url)
       res.writeHead(200, {
           'Content-Type' : mime
       })
       StreamFile.pipe(file)
   } else if(req.url.match('\.jpg')) {
    var imagePath = path.join(__dirname, 'picture', req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, {"Content-Type": mime});
    fileStream.pipe(res);
   } 
   
  else if (req.url === '/home' && req.url.match('\.css')) {
      fs.readFile('Node and Express.js Project.html',(err,data) => {
          if(err) {
              console.log(err)
          } else {
              res.writeHead(200, {
                  'Content-Type' : mime
              })
              res.write(data)
              res.end()
          }
      })
       let fileCss = path.join(__dirname,'css')
       let StreamCSs = fs.createReadStream(fileCss,'utf-8',req.url)
       res.writeHead(200 , {
           'Content-Type' : mime
       })       
       StreamCSs.pipe(file)
   
    
     
    
    }

 else {
       res.writeHead(400,() => {
       console.log('Have a some Error!')
       })
       res.end()
   }
})


server.listen(port ,() => {
    console.log(`The port run ${port}`)
})