 
const table = document.getElementById('table-body');
const token = document.querySelector('meta[name="csrf"]').content;
const searchbtn = document.getElementById("searchbtn");
const create = document.getElementById("submitNow");
const notify = document.getElementById('notify');
let IdFocus = undefined;
Notiflix.Notify.Init({width:'300px',fontSize:'14px',timeout:4000,messageMaxLength:200,});
function uiAction(data){
    console.log("data = ",data);
    if(data.status=="success")
    {
        Notiflix.Notify.Success("NoticeBoard Created!");                                  
        $.modal.close();
    }
    else{
        Notiflix.Notify.Failure("Creation Failed.!");   
    }
}
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
                'csrf-token' : token,
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
           return response.json()
        })
        .then(data => {
            
           uiAction(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

 
 const checkAvailability = async (event) =>{
     const search = document.getElementById("search").value;
     console.log("query : ",search);
     let response = await fetch('/check-url',{
        method : 'POST',
        headers : {
            'csrf-token' : token,
            'Content-Type' : 'application/json'
           
        },
        body : JSON.stringify({
              'searchUrl' : search,
          
        })
     })
      return await response.json();
 }
 const validateUrl = async () => {
     let data = await checkAvailability()
     console.log(data);
     if(data.available === true)
     {
         message("Available","show","success");
     }  
     else{

         message("Mot Available. Try a different URL Name","show","failed");
     }
     return 
 }
 
 const validateInput = async () =>{
   
    try{
            const urlValid = await checkAvailability();
            const email=document.getElementById('conemail').value;
            const title=document.getElementById('title').value;
            const url=document.getElementById('search').value;
            const phone=document.getElementById('number').value;
            let valid = true;

            if(!urlValid.available){
                valid = false;
                message("URL already taken. Try another name","show","success");
            }
            if(email==''||title==''||url==''||phone=='')
            {
                valid=false;
                Notiflix.Notify.Failure("Please fill in all the fields");
            }
            if(valid){
                //send data for nb creation
                const NB = new Ndata(url,title,email,phone);    
                NB.sendData();                                   
            }
        
    }
    catch(err)
    {
        console.log(err);
    }
   
 }
 const message = (str,action,status) => {

 
     if(action==='hide'){
         notify.style.display="none";
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
        notify.innerText=str;
        // setTimeout(
        //     function(){ 
        //     notify.style.display="none";
        //  }, 3000);
     }
 }
 const createNow = (event) =>{
   validateInput();
    
 }
const editItem = async (event) => {
 
    Notiflix.Loading.Dots('Fetching data..');
    const target =event.target;
    const id = target.parentElement.parentElement.getAttribute('data-id');
    if(!target.classList.contains('edit')){
       return
    }
    document.getElementById('updateId').value=id;
  
    let response = await fetch('/get-one-nb/'+id);
    let jsondata = await response.json();
    console.log(jsondata);
    
    Notiflix.Loading.Remove();
  document.getElementById('econemail').value=jsondata.emailContact;
   document.getElementById('etitle').value=jsondata.title;
     document.getElementById('enumber').value=jsondata.phoneContact;

 console.log("Edit item");
}
const submitNowEdit = async (event) =>{
    const nbId=document.getElementById('updateId').value;
    const response = await fetch('/update-nb',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
             'csrf-token' :token
        },
        body : JSON.stringify({
            '_id' :nbId,
            'title' :  document.getElementById('etitle').value,
            'phoneContact' :  document.getElementById('enumber').value,
            'emailContact' : document.getElementById('econemail').value
        })
    })
    const responseJson = await response.json();
    $.modal.close();
    if(responseJson.status==="success")
    {
        let getNB = await fetch('/get-one-nb/'+document.getElementById('updateId').value);
        let data = await getNB.json();
        console.log(data);
        const el = document.getElementById('table-body').children;
        
        for(let i=0;i<el.length;i++)
        {
            if(el[i].getAttribute('data-id')===nbId){

                const newData =` <td>${data.title}</td>
                <td>${data.urlname}</td>
                <td>
                    <a class="btn btn-warning view">View</a>
                    <a  class="btn btn-primary edit" href="#edit-nb" id="ebtn" rel="modal:open">Edit</a>
                    <a class="btn btn-danger delete">Delete</a>
                
                </td>
              `;
              el[i].innerHTML = newData;
              Notiflix.Notify.Success('Updated Successfully');
              break;

              
                 
            }
        }
    }
    else{
        Notiflix.Notify.Warning('Couldn\'t update');
    }
   


}

const deleteItem = (event) => {
    
    const target =event.target;
    IdFocus = target.parentElement.parentElement.getAttribute('data-id');
    if(!target.classList.contains('delete')){
        return;
    }
    Notiflix.Confirm.Show(
        'Warning',
        'You are about to delete this NoticeBoard permenantly. Do you wantcto continue ? ',
        'Delete',
        'Cancel',
    
        // ok button callback
        function(){
                            Notiflix.Loading.Dots('Deleting..');
                        fetch('/delete-nb',{
                            method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json',
                            'csrf-token'   : token
                        },
                        body : JSON.stringify({
                            id : target.parentElement.parentElement.getAttribute('data-id')
                        })

                        })
                        .then(result =>{
                            return result.json();
                        })
                        .then(data => {
                            console.log(data);
                            if(data.status==='success')
                            {
                                Notiflix.Notify.Success(target.parentElement.parentElement.firstElementChild.textContent+ ' Deleted');
                                target.parentElement.parentElement.remove();
                            }
                            else{
                                Notiflix.Notify.Failure('Could not delete'+target.parentElement.parentElement.firstElementChild.textContentL);
                            }
                            Notiflix.Loading.Remove();
                        })
                        .catch(err => {
                            console.log(err);
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Warning('Server or Network down');
                        })

        },
    
        // cancel button callback
        function(){
        // codes...
        },
    );
}
const actionmenu = (event) =>{
    const target =event.target;
    if(target.classList.contains('delete')){
        deleteItem(event);
    }
    else{
        clearCreate();
        editItem(event);
    }
}
const fetchNoticeBoard = (event) =>{
    Notiflix.Loading.Dots();
    fetch('/fetch-nb-list')
    .then(result =>{
        return result.json();
    })
    .then(data => {
        console.log(data);
        if(data.length==0){
          
            Notiflix.Report.Info('Message', "You don't have any NoticeBoards, Start creating", 'ok');
            Notiflix.Loading.Remove();
            return
        }

        data.forEach((item,index) =>{
            let dataEle = `
            <tr data-id=${item._id}>
                <td>${item.title}</td>
                <td>${item.urlname}</td>
                <td>
                    <a class="btn btn-warning view">View</a>
                    <a  class="btn btn-primary edit" href="#edit-nb" id="ebtn" rel="modal:open">Edit</a>
                    <a class="btn btn-danger delete">Delete</a>
                
                </td>
              

            </tr>
        `;
        table.innerHTML+=dataEle;

        } );
        

        Notiflix.Loading.Remove();
    })
    .catch(err => {
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure('Could not load NoticeBoard List');
    });
}
const clearCreate = () => {
    const email=document.getElementById('conemail').value='';
    const title=document.getElementById('title').value='';
    const url=document.getElementById('search').value='';
    const phone=document.getElementById('number').value='';
    const eemail=document.getElementById('econemail').value='';
    const etitle=document.getElementById('etitle').value='';
    const ephone=document.getElementById('enumber').value='';
}
document.getElementById('cbtn').addEventListener('click',clearCreate);
document.addEventListener("DOMContentLoaded", fetchNoticeBoard, false);
document.getElementById('nb-table').addEventListener('click',actionmenu);
create.addEventListener('click',createNow);
searchbtn.addEventListener('click',validateUrl);
document.getElementById('submitNowEdit').addEventListener('click',submitNowEdit);
 