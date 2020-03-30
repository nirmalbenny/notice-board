const table = document.getElementById('table-body');
const deleteNb = (event) =>{
    const target =event.target;
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove();

    }
}
const fetchNoticeBoard = (event) =>{

    fetch('/fetch-nb-list')
    .then(result =>{
        return result.json();
    })
    .then(data => {
        console.log(data);
    
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
        


    })
    .catch(err => {
        console.log("Error--couldt get noticebaord list")
    });



}

document.addEventListener("DOMContentLoaded", fetchNoticeBoard, false);
document.addEventListener('click',deleteNb);