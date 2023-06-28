document.addEventListener("DOMContentLoaded", function(){
    const attendBtn = document.getElementById("attendBtnActive");
    const meetData = JSON.parse(attendBtn.getAttribute('data-meet'));
    const mid = meetData.meetid;
    attendBtn.onclick = function(){
        fetch("/api/mompage/" + mid + "/attendance", {
            method: "POST",
            body: JSON.stringify(meetData),    
            headers:{
              'ContentType' : 'application/json'
            }
          })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            window.location.href='/api/mompage/' + mid;
        })
      }
});
