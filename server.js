const http = require("http");

const port = 8081;  //local port no.
//HTTP METHODS
//>>GET:Inorder to get data from the server
//>>post:Sending data to server
//>>DELETE:Deleting data from database
//>>PATCH:Updating certain fields
//>>PUT: full update

const toDoList = ["learn", "apply", "things", "succed"];

http
.createServer((req, res)=> { 
    const {method, url} = req;
    console.log("Method:", method);
console.log("URL:", url);
   // console.log(method, url);
   if(url === "/todos"){ 
       if(method === "GET"){ 
        res.writeHead(200, {"Content-Type": "text/html" });
        res.write(toDoList.toString());
       } else if(method === "POST"){
        let body = "";
        req
        .on("error",(err) => { 
             console.log(err);
             
        })
        .on("data" , (chunk)=> {
            body += chunk;
           // console.log(chunk);
            
        })
        .on("end",()=> { 
            body = JSON.parse(body);
            
            let newToDo = toDoList;
            newToDo.push(body.item);
            console.log(newToDo);
            //console.log("data: ", body); 
        });
       } else if(method === "DELETE"){ 
        let body = "";
        req
        .on("error",(err)=>{
            console.log(err);
        })
        .on("data", (chunk) => { 
           body += chunk;
        })
        .on("end",() => { 
            body = JSON.parse(body);
            let deleteThisItem = body.item;
            for(let i=0; i<toDoList.length; i++){ 
                if(toDoList[i]===deleteThisItem){ 
                    toDoList.splice(i,1);
                    break;
                }else{ 
                    console.error("Error: Match not found!");
                    break;
                }
            }
            //OR

            // toDoList.find((elem,index)=>{ 
            //     if(elem === deleteThisItem){
            //         toDoList.splice(index, 1);
            //     }else { 
                  //  console.error("Error: Match not found!");
            //       //  console.exit();
            //     }
            // });
        });
       }
       else { 
        res.writeHead(501);
       }
       }else { 
        res.writeHead(404);
       }
    res.end();

    // res.writeHead(200, {"Content-Type": "text/html" });
    // res.write("<h2>Hey server Started :-)</h2>");
    // res.end();
})
.listen(port , ()=>{   //call back function
    console.log(`NodeJs server started Running on port ${port}`);
    
})


//http://localhost:8081
