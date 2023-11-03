window.addEventListener('DOMContentLoaded',loadlist)
const key="a3d34d73d5704de28408fbbac06100f3"
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
    })
    .catch(err=>console.log(err))


}








