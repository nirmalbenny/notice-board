 
const searchbtn = document.getElementById("searchbtn");
const create = document.getElementById("submitNow");
const csrf = document.getElementById("key").value;
const notify =document.getElementById('notify');
notify.style.display="none";
class Ndata {
    constructor(urlname, title, emailContact, phoneContact)
    {
        this.urlname=urlname;
        this.title=title;
        this.emailContact=emailContact;
        this.phoneContact=phoneContact;
    }
    sendData(){
        fetch('/add-noticeboard',{
            method : 'POST',
            headers : {
                'csrf-token' : csrf,
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                "urlname" : this.urlname,
                "title"   : this.title,
                "emailContact" : this.emailContact,
                "phoneContact" : this.phoneContact
            })
        })
        .then((response)=>{
            response.json()
            .then((d)=>{
                
                return d;
            })
          
        })
        .catch(err => {
            console.log(err);
        });
    }
}

 
 
const checkAvailability = (event) =>{
     const search = document.getElementById("search").value;

 
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
            
            return  result.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
            console.log("CHECK URL FAILED");
        })
 }
 const message = (str,action,status) => {
     if(action==='hide'){
         notify.style.display="inline";
         return ''
     }
     else if(action==='show'){
        notify.style.display="inline";
        if(status === 'success')
        {
            notify.style.color="green";
        }
        else{
            notify.style.color="red";
        }
        notify.innerText="Name is available";
     }
   
   
 }
 
 const createNow = (event) =>{
    const email=document.getElementById('conemail').value;
    const title=document.getElementById('title').value;
    const url=document.getElementById('search').value;
    const phone=document.getElementById('number').value;
    console.log(email,",",title);
 
    //   message("it is available","show",'failed');
    const NB = new Ndata(url,title,email,phone);

     NB.sendData();

 }

create.addEventListener('click',createNow);
searchbtn.addEventListener('click',checkAvailability);

