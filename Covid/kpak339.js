// Tab functions
function activeTab(tabName){
    var i;
    var x = document.getElementsByClassName("content");
    
    for (i = 0; i < x.length; i++){
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}
// End of tabs

// Covid19api functions

// Global Functions
function getGlobal(){
    //let url = encodeURIComponent("https://api.covid19api.com/summary");
    //let proxy = 'http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url=';
    let url = "https://api.covid19api.com/summary";
    let proxy = '';
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Accept" : "application/json",
        },
      };

    const fetchPromise = fetch(proxy + url, requestOptions);
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((result) => showGlobal(result));
    streamPromise.catch(error => console.log('error', error));     
}
function showGlobal(data){
    let entries = '<br>';
    // Cards to show global stats
    // Confirmed
    entries+="<div class='card'>";
    entries+="Total Confirmed Cases: <br>" + data.Global.TotalConfirmed + "<br>";
    entries+="<br>";
    entries+="New Confirmed Cases: <br>" + data.Global.NewConfirmed + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1097/1097932.svg' width=100px;>";
    entries+= "<img src='images/total.svg' height=100px;>";
    entries+="</div>";

    // Recovered
    entries+="<div class='card'>";
    entries+="Recovered Cases: <br>" + data.Global.TotalRecovered + "<br>";
    entries+="<br>";
    entries+= "New Recovered Cases: <br>" + data.Global.NewRecovered + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1512/1512922.svg' width=100px;>";
    entries+= "<img src='images/recovered.svg' height=100px;>";
    entries+="</div>";

    // Deaths
    entries+="<div class='card'>";
    entries+="Total Deaths: <br>" + data.Global.TotalDeaths + "<br>";
    entries+="<br>";
    entries+="New Deaths: <br>" + data.Global.NewDeaths + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3314/3314413.svg' width=100px;>";
    entries+= "<img src='images/death.svg' height=100px;>";
    entries+="<br>";
    entries+="</div>";

    
    document.getElementById("gStats").innerHTML = entries;
}
// New Zealand Functions
function getCountry(){
    //let url = encodeURIComponent("https://api.covid19api.com/total/dayone/country/new-zealand");
    //let proxy = 'http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url=';
    let url = "https://api.covid19api.com/total/dayone/country/new-zealand";
    let proxy = '';

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Accept" : "application/json",
        },
      };

    const fetchPromise = fetch(proxy + url, requestOptions);
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((result) => showCountry(result));
    streamPromise.then((result) => drawNZ(result));
    streamPromise.then((result) => drawBig(result));
    streamPromise.then((result) => drawNZActive(result));
    streamPromise.then((result) => drawBigActive(result));
    streamPromise.then((result) => drawNZRecovered(result));
    streamPromise.then((result) => drawBigRecovered(result));
    streamPromise.then((result) => drawNZDeaths(result));
    streamPromise.then((result) => drawBigDeaths(result));
    streamPromise.catch(error => console.log('error', error));        
}
function showCountry(data){
    let entries = '';
    let GlobalDate = '';
    GlobalDate = "<h1 style='padding: 15px; font-size:6vh;'> Global Statistics for : "+ data[data.length-1].Date.slice(0,10) +"</h1>";
    document.getElementById("globalDate").innerHTML = GlobalDate;
    // Shows NZ Total cases
    entries+="<div class='card'>";
    entries+="Total Cases: <br>" + data[data.length-1].Confirmed + "<br>";
    entries+="<br>";
    entries+="Last 24 Hours: <br>" + (data[data.length-1].Confirmed - data[data.length-2].Confirmed) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1097/1097932.svg' width=100px;>";
    entries+= "<img src='images/total.svg' height=100px;>";
    entries+="<br>";
    entries+="<br>";
    entries+="Last Updated: <br>";
    entries+=data[data.length-1].Date.slice(0,10);
    entries+="</div>";
    
    // Shows NZ Active cases
    entries+="<div class='card'>";
    entries+="Active Cases: <br>" + data[data.length-1].Active + "<br>";
    entries+="<br>";
    entries+="Last 24 Hours: <br>" + (data[data.length-1].Active - data[data.length-2].Active) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/2904/2904134.svg' width=100px;>";
    entries+= "<img src='images/active.svg' height=100px;>";
    entries+="<br>";
    entries+="<br>";
    entries+="Last Updated: <br>";
    entries+=data[data.length-1].Date.slice(0,10);
    entries+="</div>";

    // Shows NZ Recovered cases
    entries+="<div class='card'>";
    entries+="Recovered Cases: <br>" + data[data.length-1].Recovered + "<br>";
    entries+="<br>";
    entries+="Last 24 Hours: <br>" + (data[data.length-1].Recovered - data[data.length-2].Recovered) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1512/1512922.svg' width=100px;>";
    entries+= "<img src='images/recovered.svg' height=100px;>";
    entries+="<br>";
    entries+="<br>";
    entries+="Last Updated: <br>";
    entries+=data[data.length-1].Date.slice(0,10);
    entries+="</div>";

    // Shows NZ COVID Deaths
    entries+="<div class='card'>";
    entries+="Cases Resulting In Deaths: <br>" + data[data.length-1].Deaths + "<br>";
    entries+="<br>";
    entries+="Last 24 Hours: <br>" + (data[data.length-1].Deaths - data[data.length-2].Deaths) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3314/3314413.svg' width=100px;>";
    entries+= "<img src='images/death.svg' height=100px;>";
    entries+="<br>";
    entries+="<br>";
    entries+="Last Updated: <br>";
    entries+=data[data.length-1].Date.slice(0,10);
    entries+="</div>";


    // Show today's stats
    entries+="<h style='padding: 15px; font-size:5vh;'>Today Statistics</h>";
    entries+="<div class='card3'>";
    entries+="<div class='grid'>";
    // Total Cases
    entries+="<div class='item'>";
    entries+="Total Cases: " + (data[data.length-1].Confirmed) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1097/1097932.svg' width=100px;>";
    entries+= "<img src='images/total.svg' height=100px;>";
    
    entries+="<br>";
    entries+="</div>";
    // New Cases
    entries+="<div class='item'>";
    entries+="New Cases: " + (data[data.length-1].Confirmed-data[data.length-2].Confirmed) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3209/3209103.svg' width=100px;>";
    entries+= "<img src='images/new.svg' height=100px;>";
    entries+="<br>";
    entries+="</div>";
    // Active Cases
    entries+="<div class='item'>";
    entries+="Active Cases: " + (data[data.length-1].Active) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/2904/2904134.svg' width=100px;>";
    entries+= "<img src='images/active.svg' height=100px;>";
    entries+="<br>";
    entries+="</div>";
    // Recovered Cases
    entries+="<div class='item'>";
    entries+="Recovered Cases: " + (data[data.length-1].Recovered - data[data.length-2].Recovered) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1512/1512922.svg' width=100px;>";
    entries+= "<img src='images/recovered.svg' height=100px;>";
    entries+="<br>";
    entries+="</div>";
    // Deaths
    entries+="<div class='item'>";
    entries+="Cases Resulting In Deaths: " + (data[data.length-1].Deaths - data[data.length-2].Deaths) + "<br>";
    entries+="<br>";
    //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3314/3314413.svg' width=100px;>";
    entries+= "<img src='images/death.svg' height=100px;>";
    entries+="<br>";
    entries+="</div>";
    // Date
    entries+="</div>";
    entries+="<h>Statistics for "+ data[data.length-1].Date.slice(0,10) +"</h>";
    entries+="</div>";

    document.getElementById("nzStats").innerHTML = entries;
}
function getDaily(){
    // let url = encodeURIComponent("https://api.covid19api.com/total/dayone/country/new-zealand");
    // let proxy = 'http://redsox.uoa.auckland.ac.nz/cors/CorsProxyService.svc/proxy?url=';
    let url = "https://api.covid19api.com/total/dayone/country/new-zealand";
    let proxy = '';

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Accept" : "application/json",
        },
      };

    const fetchPromise = fetch(proxy + url, requestOptions);
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((result) => showAll(result));
    streamPromise.catch(error => console.log('error', error));        
}
function showAll(data){
    let entries = '';
    for (var x=data.length-1; x>0; x--){
        
        entries+="<div class='card2'>";
        entries+="<div class='grid'>";
        // Total Cases
        entries+="<div class='item'>";
        entries+="Total Cases: " + (data[x].Confirmed) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1097/1097932.svg' width=100px;>";
        entries+= "<img src='images/total.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // New Cases
        entries+="<div class='item'>";
        entries+="New Cases: " + (data[x].Confirmed-data[x-1].Confirmed) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3209/3209103.svg' width=100px;>";
        entries+= "<img src='images/new.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Active Cases
        entries+="<div class='item'>";
        entries+="Active Cases: " + (data[x].Active) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/2904/2904134.svg' width=100px;>";
        entries+= "<img src='images/active.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Recovered Cases
        entries+="<div class='item'>";
        entries+="Recovered Cases: " + (data[x].Recovered - data[x-1].Recovered) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1512/1512922.svg' width=100px;>";
        entries+= "<img src='images/recovered.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Deaths
        entries+="<div class='item'>";
        entries+="Cases Resulting In Deaths: " + (data[x].Deaths - data[x-1].Deaths) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3314/3314413.svg' width=100px;>";
        entries+= "<img src='images/death.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Date
        entries+="</div>";
        entries+="<h>Statistics for "+ data[x].Date.slice(0,10) +"</h>";
        entries+="</div>";

    }
        // Hard code the first entry as data[0-1] doesnt exist.
        entries+="<div class='card2'>";
        entries+="<div class='grid'>";
        // Total Cases
        entries+="<div class='item'>";
        entries+="Total Cases: " + (data[0].Confirmed) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1097/1097932.svg' width=100px;>";
        entries+= "<img src='images/total.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // New Cases
        entries+="<div class='item'>";
        entries+="New Cases: " + (data[0].Confirmed) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3209/3209103.svg' width=100px;>";
        entries+= "<img src='images/new.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Active Cases
        entries+="<div class='item'>";
        entries+="Active Cases: " + (data[0].Active) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/2904/2904134.svg' width=100px;>";
        entries+= "<img src='images/active.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Recovered Cases
        entries+="<div class='item'>";
        entries+="Recovered Cases: " + (data[0].Recovered) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/1512/1512922.svg' width=100px;>";
        entries+= "<img src='images/recovered.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Deaths
        entries+="<div class='item'>";
        entries+="Cases Resulting In Deaths: " + (data[0].Deaths) + "<br>";
        entries+="<br>";
        //entries+= "<img src='https://www.flaticon.com/svg/static/icons/svg/3314/3314413.svg' width=100px;>";
        entries+= "<img src='images/death.svg' height=100px;>";
        entries+="<br>";
        entries+="</div>";
        // Date
        entries+="</div>";
        entries+="<h>Statistics for "+ data[0].Date.slice(0,10) +"</h>";
        entries+="</div>";

    document.getElementById("dStats").innerHTML = entries;
}

// Total confirmed Graphs
function drawNZ(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Confirmed;
    var Min = Max;
    var values = [];
    xint = 30;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Confirmed > Max){
            Max = data[x].Confirmed;
        }
        if (data[x].Confirmed < Min){
            Min = data[x].Confirmed;
        }
        values.push(data[x].Confirmed)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Cases for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        // Drawing y-axis
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            yTextInt -= Math.round(Axis/yint);
            y += (70/yint);
        }
        if ((k%2==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='84%'>" + data[data.length-k].Date.slice(5,10) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Confirmed-Min)/Axis)*70));
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Confirmed-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='3' />";
        
        
        x -= (90/xint);
    }
    entries += "<text id='totalPoint' x='50%' y='90%'> </text>";
    document.getElementById("nzGraph").innerHTML = entries;
}
function drawBig(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Confirmed;
    var Min = Max;
    var values = [];
    xint = data.length-1;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Confirmed > Max){
            Max = data[x].Confirmed;
        }
        if (data[x].Confirmed < Min){
            Min = data[x].Confirmed;
        }
        values.push(data[x].Confirmed)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Cases for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // Day / Month Text
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='84%'> Day </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='88%'> Month </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='92%'> Year </text>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy, yint;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);
    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            if (yTextInt<=0){
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + 0 + "</text>";
            }else{
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            }
            yTextInt -= Math.round(Axis/yint);
            
            y += (70/yint);
        }
        if ((k%14==0)){
            
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='84%'>" + data[data.length-k].Date.slice(8,10) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) + "%' y='88%'>" + data[data.length - k].Date.slice(5, 7) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) + "%' y='92%'>" + data[data.length - k].Date.slice(2, 4) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Confirmed-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='2' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Confirmed-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }
    document.getElementById("nzGraphAll").innerHTML = entries;
}
// Total Active graphs
function drawNZActive(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Active;
    var Min = Max;
    var values = [];
    xint = 30;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Active > Max){
            Max = data[x].Active;
        }
        if (data[x].Active < Min){
            Min = data[x].Active;
        }
        values.push(data[x].Active)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Active Cases for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            yTextInt -= Math.round(Axis/yint);
            
            y += (70/yint);
        }
        if ((k%2==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='84%'>" + data[data.length-k].Date.slice(5,10) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Active-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='3' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Active-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }

    document.getElementById("nzGraphActive").innerHTML = entries;
}
function drawBigActive(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Active;
    var Min = Max;
    var values = [];
    xint = data.length-1;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Active > Max){
            Max = data[x].Active;
        }
        if (data[x].Confirmed < Min){
            Min = data[x].Active;
        }
        values.push(data[x].Active)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Active Cases for the past "+ xint + "days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // Day / Month Text
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='84%'> Day </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='88%'> Month </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='92%'> Year </text>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            if (yTextInt<=0){
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + 0 + "</text>";
            }else{
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            }
            yTextInt -= Math.round(Axis/yint);
            
            y += (70/yint);
        }
        if ((k%14==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='84%'>" + data[data.length-k].Date.slice(5,7) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='88%'>" + data[data.length-k].Date.slice(8,10) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='92%'>" + data[data.length-k].Date.slice(2,4) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Active-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='2' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Active-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }

    document.getElementById("nzGraphAllActive").innerHTML = entries;
}
// Total Recovered graphs
function drawNZRecovered(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Active;
    var Min = Max;
    var values = [];
    xint = 30;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Recovered > Max){
            Max = data[x].Recovered;
        }
        if (data[x].Recovered < Min){
            Min = data[x].Recovered;
        }
        values.push(data[x].Recovered)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Recovered Cases for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            yTextInt -= Math.round(Axis/yint);
            
            y += (70/yint);
        }
        if ((k%2==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='84%'>" + data[data.length-k].Date.slice(5,10) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Recovered-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='3' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Recovered-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }

    document.getElementById("nzGraphRecovered").innerHTML = entries;
}
function drawBigRecovered(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Recovered;
    var Min = Max;
    var values = [];
    xint = data.length-1;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Recovered > Max){
            Max = data[x].Recovered;
        }
        if (data[x].Confirmed < Min){
            Min = data[x].Recovered;
        }
        values.push(data[x].Recovered)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Recovered Cases for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // Day / Month Text
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='84%'> Day </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='88%'> Month </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='92%'> Year </text>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = 20;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            if (yTextInt<=0){
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + 0 + "</text>";
            }else{
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            }
            yTextInt -= Math.round(Axis/yint);
            
            y += (70/yint);
        }
        if ((k%14==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='84%'>" + data[data.length-k].Date.slice(8,10) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='88%'>" + data[data.length-k].Date.slice(5,7) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='" + (x - 0.75) +"%' y='92%'>" + data[data.length-k].Date.slice(2,4) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Recovered-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='2' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Recovered-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }

    document.getElementById("nzGraphAllRecovered").innerHTML = entries;
}
// Total Death graphs
function drawNZDeaths(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Deaths;
    var Min = Max;
    var values = [];
    xint = 30;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Deaths > Max){
            Max = data[x].Deaths;
        }
        if (data[x].Deaths < Min){
            Min = data[x].Deaths;
        }
        values.push(data[x].Deaths)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Deaths for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint;
    y = 10;
    x = 95;
    
    yint = Axis;
    yTextInt = (Min);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            yTextInt -= Math.round(Axis/yint);
            
            y += (900/yint);
        }
        if ((k%2==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='84%'>" + data[data.length-k].Date.slice(5,10) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Deaths-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='3' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Deaths-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }
        x -= (90/xint);
    }

    document.getElementById("nzGraphDeaths").innerHTML = entries;
}
function drawBigDeaths(data){
    let entries = '';
    var x, xint;
    var Max=data[data.length-1].Deaths;
    var Min = Max;
    var values = [];
    xint = data.length-1;
    for (x=data.length-1;x>data.length-1-xint;x--){
        if (data[x].Deaths > Max){
            Max = data[x].Deaths;
        }
        if (data[x].Confirmed < Min){
            Min = data[x].Deaths;
        }
        values.push(data[x].Deaths)
    }

    var Axis = Max-Min;
    // Title
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='20px' x='35%' y='5%'> Total Deaths for the past "+ xint + " days </text>";
    // Y-axis Line
    entries += "<line x1='5%' y1='10%' x2='5%' y2=80% stroke='black' stroke-width='2'/>";
    // Day / Month Text
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='84%'> Day </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='88%'> Month </text>";
    entries += "<text text-achor='middle' dominant-baseline='middle' font-size='10px' x='0%' y='92%'> Year </text>";
    // X-axis Line
    entries += "<line x1='5%' y1='80%' x2='95%' y2='80%' stroke='black' stroke-width='2'/>";
    var k, y, x, cy,  yint, prev;
    y = 10;
    x = 95;
    
    yint = Axis;
    yTextInt = (Max);

    for (k=1; k<=xint;k+=1){
        if (k<=yint+1){
            
            if (yTextInt<=0){
                entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + 0 + "</text>";
            }else if (!(yTextInt % 50)){
                entries += "<line x1='4.5%' y1='"+ y +"%' x2='5%' y2='"+ y +"%' stroke='black' stroke-width='2'/>";
                entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='0%' y='"+ y +"%'>" + yTextInt + "</text>";
            }
            yTextInt -= Math.round(Axis/yint);
            
            y += (80/yint);
        }
        if ((k%14==0)){
            entries += "<line x1='"+ x + "%' y1='80%' x2='"+ x + "%' y2='82%' stroke='black' stroke-width='2'/>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='84%'>" + data[data.length-k].Date.slice(8,10) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='88%'>" + data[data.length-k].Date.slice(5,7) + "</text>";
            entries += "<text text-achor='middle' dominant-baseline='middle' font-size='11px' x='"+ (x-1.5) +"%' y='92%'>" + data[data.length-k].Date.slice(2,4) + "</text>";
        } 
        
        cy = 80 - ((((data[data.length-k].Deaths-Min)/Axis)*70));

        entries += "<circle id='point' cx='"+ x +"%' cy='"+ cy +"%' r='2' />";
        if (k != 1) {
            cy2 = 80 - ((((data[data.length-k+1].Deaths-Min)/Axis)*70));
            entries += "<line x1='" + x + "%' y1='" + cy + "%' x2='" + (x+(90/xint)) + "%' y2='" + cy2 + "%' stroke='black' stroke-width='1' />";
        }

        
        x -= (90/xint);
    }

    document.getElementById("nzGraphAllDeaths").innerHTML = entries;
}


// End of Covid19api functions
// When the page is loaded, this function will be ran
window.onload = getCountry();