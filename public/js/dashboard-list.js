const table = document.getElementById('table-body');
const token = document.querySelector('meta[name="csrf"]').content;
Notiflix.Notify.Init({width:'300px',fontSize:'14px',timeout:4000,messageMaxLength:200,});
const deleteNb = (event) =>{
    const target =event.target;
    if(target.classList.contains('delete')){



                                // e.g. with callback
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







             
                    //   
                   
          
      

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
                    <button class="btn btn-warning view">View</button>
                    <button class="btn btn-primary edit">Edit</button>
                    <button class="btn btn-danger delete">Delete</button>
                
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

document.addEventListener("DOMContentLoaded", fetchNoticeBoard, false);
document.addEventListener('click',deleteNb);