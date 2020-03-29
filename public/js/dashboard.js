
const checkAvailability = (event) =>{
     const search = document.getElementById("search").value;
     const csrf = document.getElementById("key").value;
     console.log("CSRF : ",csrf);
     console.log("query : ",search);
     fetch('/check-url',{
        method : 'POST',
        headers : {
            'csrf-token' : csrf,
            'Content-Type' : 'application/json'
           
        },
        body : JSON.stringify({
              'searchUrl' : search,
          
        })
     }).then(result => {
            console.log("------------ SUCCESS ----------");
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            console.log("CHECK URL FAILED");
        })
 }

document.getElementById("searchbtn").addEventListener('click',checkAvailability);

