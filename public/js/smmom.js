form.addEventListener('submit',()=>{
    const meet = document.getElementById("form");
    const meetdets = JSON.parse(meet.getAttribute("data-form"));
    const mid = meetdets.meetid;
    const momap = {
        mid: mid,
        meetingMinute : document.getElementById("meetingMinute").value,
        actionPlan : document.getElementById("actionPlan").value
    }
    fetch('/api/mompage/momap',{
        method: 'POST',
        body: JSON.stringify(momap),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        // console.log(data);
        window.location.href='/api/mompage/' + mid;
    })
});