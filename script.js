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
    .catch(err=>console.log(err))

}

listwrapper=document.getElementById('appointments')

function showList(listdata){

    listdata.map((listitem)=>{
    let li=document.createElement('li')
    li.className="list-group-item d-flex justify-content-around"
        li.innerHTML=`
        <div>${listitem["Name"]}</div>
        <div>${listitem["Email"]}</div>
        <div>${listitem["Phone"]}</div>
        <div>${listitem["Date"]}</div>
        <div>${listitem["Time"]}</div>
        `
    listwrapper.appendChild(li)

    
    })
}

function loadlist(){
    
    axios.get(url)
    .then(res=> showList(res.data))
    .catch(err=>console.log(err))


}




window.addEventListener('DOMContentLoaded',loadlist)



