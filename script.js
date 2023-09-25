


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
    console.log(jsondata)
    alert(JSON.stringify(jsondata))

}



