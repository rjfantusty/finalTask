window.addEventListener('DOMContentLoaded',loadlist)
const key="d1f06f7fc3d446fd906148d6954c95be"
const url=`https://crudcrud.com/api/${key}/appointments`
function formhandler(e){
    e.preventDefault();
    console.log(e.target.Name.value)
    console.log(e.target.Email.value)
    console.log(e.target.Phone.value)
    console.log(e.target.Date.value)
    console.log(e.target.Time.value)

    const formdata= new FormData(e.target)
    const jsondata={}
    formdata.forEach((value,key)=>jsondata[key]=value)

    axios.post(url,jsondata)
    .then(data=> window.alert('appointment saved'))
    .then(()=> location.reload())
    .catch(err=>console.log(err))

}
function edithandler(e){
    e.preventDefault();
    console.log(e.element)
    console.log(e.target.Name.value)
    console.log(e.target.Email.value)
    console.log(e.target.Phone.value)
    console.log(e.target.Date.value)
    console.log(e.target.Time.value)

    let clientid=document.getElementById('clientid').textContent

    const formdata= new FormData(e.target)
    const jsondata={}
    formdata.forEach((value,key)=>jsondata[key]=value)

    axios.put(`${url}/${clientid}`,jsondata)
    .then(data=> window.alert('appointment edited'))
    .then(()=> location.reload())
    .catch(err=>console.log(err))

}


listwrapper=document.getElementById('appointments')

function showList(listdata){
    console.log(listdata)
    listdata.map((listitem)=>{
    let li=document.createElement('li')
    li.className="list-group-item d-flex justify-content-around"
    li.id=`${listitem._id}`
        li.innerHTML=`
        <div>${listitem["Name"]}</div>
        <div>${listitem["Email"]}</div>
        <div>${listitem["Phone"]}</div>
        <div>${listitem["Date"]}</div>
        <div>${listitem["Time"]}</div>
        <button type="button"  class="btn btn-danger edit" >edit</button>
        <button type="button" class="btn btn-danger delete" >X</button>
        `
    listwrapper.appendChild(li)

    
    })
}

function deleteOneList(e){
    element=e.target
    parent=element.parentNode
    
    axios.delete(`${url}/${parent.id}`)
    .then(data=>console.log('deleted'))
    .then(()=>location.reload())
    .catch(err=>console.log(err))
}

function editOneList(e){
    e.preventDefault()
    document.getElementById('getform').classList.add('d-none')
    let editform=document.getElementById('editform').classList.remove('d-none')
    
    element=e.target
    parent=element.parentNode
    
    axios.get(`${url}/${parent.id}`)
    .then((res)=>{
        let userdata=res.data
       let {_id,Name,Email,Phone,Date,Time}=userdata
       
       document.getElementById('clientid').innerText=_id 
       document.getElementById('editname').value=Name 
       document.getElementById('editemail').value=Email
       document.getElementById('editphone').value=Phone
       document.getElementById('editdate').value=Date
       document.getElementById('edittime').value=Time

    })
    .catch(err=>console.log(err))
}



function loadlist(){
    console.log('loading')
    axios.get(url)
    .then(res=> showList(res.data))
    .then(()=>{
        let deletebuttons=document.getElementsByClassName('delete')
        deletebuttons= Array.from(deletebuttons)
        deletebuttons.map((btn)=>{
            btn.addEventListener('click',deleteOneList)
        })

        let editbuttons=document.getElementsByClassName('edit')
        editbuttons= Array.from(editbuttons)
        editbuttons.map((btn)=>{
            btn.addEventListener('click',editOneList)
        })
    })
    .catch(err=>console.log(err))


}








