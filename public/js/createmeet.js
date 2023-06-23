document.addEventListener("submit",()=>{
    const meet = {
        department : document.getElementById("Meet-dept").value,
        date : document.getElementById("Meet-date").value,
        time : document.getElementById("Meet-time").value,
        location : document.getElementById("Meet-loc").value,
        agenda : document.getElementById("Meet-agenda").value,
        zoomlink : document.getElementById("Meet-link").value,
    }
    fetch('/api/createmeet',{
        method: 'POST',
        body: JSON.stringify(meet),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data=> {
        if(data.status == "success"){
            document.getElementById("ov-dept").innerText = document.getElementById("Meet-dept").value;
            document.getElementById("ov-date").innerText = "Date: " + document.getElementById("Meet-date").value;
            document.getElementById("ov-time").innerText = "Time: " + document.getElementById("Meet-time").value;
            document.getElementById("ov-loc").innerText = "Location: " + document.getElementById("Meet-loc").value;
            document.getElementById("ov-zoomlink").innerText = "Zoom link: " + document.getElementById("Meet-link").value;
            document.getElementById("ov-agenda").innerText = "Agenda: " + document.getElementById("Meet-agenda").value;
            document.getElementById("meet-summary").style.display = "block";
        }
    })
});

    document.getElementById("meet-summary").onclick = ()=>{
        document.getElementById("meet-summary").style.display = "none";
    }