const http = require("http");

const port = 8081;  //local port no.

http.
createServer((req, res)=> { 
    res.writeHead(200, {"Content-Type": "text/html" });
    res.write("<h2>Hey server Started :-)</h2>");
    res.end();
})
.listen(port , ()=>{   //call back function
    console.log(`NodeJs server started Running on port ${port}`);
    
})

//http://localhost:8081
