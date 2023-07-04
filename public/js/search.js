const form = document.getElementById("searchForm");
const submitBtn = document.getElementById("searchBtn");

// submitBtn.onclick = function(){
form.addEventListener("submit", function(event){
    const searchDate = document.getElementById("Search-date").value;
    const searchDept = document.getElementById("Search-dept").value;
    
    const params = new URLSearchParams();
    params.append('status', 'exists');
    params.append('Sdate', searchDate);
    params.append('Sdept', searchDept);
    
    fetch("/api/searchres?" + params.toString(),{
        method: 'GET'
    })
    .then(res=>window.location.href='/api/searchres?' + params.toString())
    .catch(err=>console.log(err))
});