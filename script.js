const url = "https://api.openbrewerydb.org/breweries";

//calling function of data generation.
let tabledata = getdata();

//Fecthing the data from API.
function urldata(){
    return fetch(url);
}

//extracting data using async await and error catching
async function getdata(){
    try{ 
                            
        //extracting the data
        let response= await urldata(); // fetching data with promise object
        let data = await response.json(); // converting promise obect data to json data
        console.log(data);

        //creating a div with id as container and appending to body document
        const mydiv = document.createElement("div");
        mydiv.id = "container";
        document.body.append(mydiv);

        //creation of table,thead,tbody
        const table = document.createElement("table"); 
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        table.append(thead,tbody); // appending thead,tbody to table element
        mydiv.appendChild(table); // appending table to div element
        table.id = "mytable"; //assigning the id value to table tag
        tbody.id = "tbody"; //assigning the id value to tbody tag

        //creating table row in thead and inserting cell data
        let row = thead.insertRow();
        row.id= "rowhead";
        let heading = `
        <th>Name</th>
        <th>Brewery_Type</th>
        <th>Address</th>
        <th>Website_URL</th>
        <th>Phone</th>
        `
        row.innerHTML= heading; // assigning cell data
        
        //creating tablebody celldata
        let tabledata = "";
        for(let i=0;i<data.length;i++){ //accessing all the objects in an array
            let tr = document.createElement("tr"); //creating row for every object in iteraton.
            let value = data[i];
            tabledata=`
            <td>${value.name}</td>
            <td>${value.brewery_type}</td>
            <td>city:${value.city},state:${value.state},country:${value.country},</td>
            <td>${value.website_url}</td>
            <td>${value.phone}</td>
            `
            tr.innerHTML=tabledata;
            tbody.appendChild(tr);
        }
        
    }catch(error){ 
        console.log(error); //catching the error
    }
}

        //creating a div with id as container and appending to body document
        const heading = document.createElement("h1");
        heading.id = "heading";
        heading.textContent="Breweries List";
        document.body.append(heading);


        //creating a div with id as container and appending to body document
        const mydiv2 = document.createElement("div");
        mydiv2.id = "search";
        document.body.append(mydiv2);

        //creation of input tag and button tag and appending them to div tag;
        let input = document.createElement("input"); //input tag created
        input.setAttribute("type","search"); // assigned the attribute type
        input.setAttribute("id","myinput"); // assigned the attribute id
        input.setAttribute("placeholder","Search names...");

        let button = document.createElement("button"); // created the button tag
        button.textContent = "Search"; // giving the button name 
        button.id = "btn" // for css
        
        //appending input tag and button tag to div2
        mydiv2.append(input,button);
        
        //adding action to search button
        button.addEventListener("click",search); //calling search fun on click of a button key.

//creation of search function
function search(){
    // accessing input value and convert to capcase letters to avoid case sensetive
    let filter = document.getElementById("myinput").value.toUpperCase();
    
    let tbody = document.getElementById("tbody"); //accessing the tbody of table
    let tr = tbody.getElementsByTagName("tr"); // accessing the rows of tbody

    for(let key in tr){ //iteration of rows
        let td = tr[key].getElementsByTagName("td")[0]; //acessing the first column of each row
        if(td){
            let text = td.textContent || td.innerHTML; //accessing the celldata value
            if(text.toUpperCase().indexOf(filter)>-1){  //checking with input value
                tr[key].style.display=""; // assigned empty property value for name sake, even this line not there also code runs fine. 
            }else{
        // assign display proerty to none when the input value doesnt match with column celldata.so the row is not dispalyed.
                tr[key].style.display="none"; 
             }
        }
    }
}


