
document.addEventListener('DOMContentLoaded', ()=>{
    
    document.addEventListener('click',(event)=>{
        if(event.target.className == "editBtn"){
            editMomap(event.target.dataset.id);
        }
        if(event.target.className == "deleteBtn"){
            deleteMomap(event.target.dataset.id);
        }
    })
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const printBtn = document.getElementById("printBtn");

addBtn.onclick = function (){
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
    }   

    function editMomap(momapid){
        const secId = momapid;
        const updateSection = document.querySelector(`section[data-id="${secId}"]`);
        updateSection.hidden = false;

        updateBtn.onclick = ()=>{
            const updateMeet = document.getElementById("update-form");
            const updateMeetDets = JSON.parse(updateMeet.getAttribute("data-updateForm"));
            const updateMid = updateMeetDets.meetid;
            const updateMomap = {
                id: momapid,
                mid: updateMid,
                meetingMinute : document.getElementById("update-meetingMinute").value,
                actionPlan : document.getElementById("update-actionPlan").value
            }   
        
            fetch("/api/mompage/update",{
                method: 'PATCH',
                body: JSON.stringify(updateMomap),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }) 
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                window.location.href='/api/mompage/' + updateMid;
            })
        }
    }

    function deleteMomap(momapid){
            fetch("/api/mompage/delete/" + momapid, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.status=="success")
                location.reload();
            })
    }

    printBtn.onclick = ()=>{
        window.print();
    }

});