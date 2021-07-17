let contactObj = new Contact();
let isUpdate = false;
window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector(".text-error");
    let nameRegex = RegExp("^([A-Z]{1}[A-Za-z]{2,}[ ]?){1,}$");
    validateEntry(name, nameRegex, textError);

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector(".phone-error");
    let phoneRegex = RegExp("^[+]?([0-9]{2}[ ])?[6-9]{1}[0-9]{9}$");
    validateEntry(phone, phoneRegex, phoneError);

    const address = document.querySelector('#address');
    const addressError = document.querySelector(".address-error");
    let addressRegex = RegExp("^([A-Za-z0-9/,-.]{2,}[ ]?)+$");
    validateEntry(address, addressRegex, addressError);

    function validateEntry(entry, regex, errorField) {
        entry.addEventListener('input', function () {
            if (regex.test(entry.value) || entry.value.length == 0)
                errorField.textContent = "";
            else
                errorField.textContent = "Invalid entry in the column";
        });
    }

    checkForUpdate();
});

const save = () => {
    try {
        setContactObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            alert("Data Stored With Name "+addressBookObject._name);
            resetForm();
            window.location.replace(site_properties.home_page)
        }else
            createOrUpdatePersonInJsonServer();
    } catch (e) {
        console.log(e);
        return;
    }
}

const resetForm = () => {
    document.querySelector("#name").value = "";
    document.querySelector('#phone').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#city').value = "";
    document.querySelector('#state').value = "";
    document.querySelector('#zip').value = "";
}

const setContactObject = ()=>{
    try{
        contactObj._id = createNewContactId();
        contactObj._name = document.querySelector('#name').value;
        contactObj._phone = document.querySelector('#phone').value;
        contactObj._address = document.querySelector('#address').value;
        contactObj._city = document.querySelector('#city').value;
        contactObj._state = document.querySelector('#state').value;
        contactObj._zip = document.querySelector('#zip').value;
    }catch(e){
        alert("Please enter valid details!");
    }
}
function createOrUpdatePersonInJsonServer() {
    let url=site_properties.server_url;
    let methodCall="POST";
    let message="Data Store with name ";
    if(isUpdate){
        methodCall="PUT";
        url=url+contactObj.id.toString();
         message="Data Updated with name ";
    }
    makeServiceCall(methodCall,url,true,contactObj)
        .then(response=>{
            alert(message +contactObj._name)
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error=>{
            console.log("inside error")
            throw error
        });
}
const getInputValueId = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


const setTextValue = (id, value) => {
    const textError = document.querySelector(id);
    textError.textContent = value;
}


//Generating contact id for all objects
const createNewContactId = () => {
    let empID = localStorage.getItem("ContactID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("ContactID", empID);
    return empID;
}

const createAndUpdateStorage = ()=>{
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList){
        let contactData = contactList.find(contact=>contact._id ==contactObj._id);
        if(!contactData){
            node._id=createNewContactId();
            contactList.push(contactObj);
        } else {
            const index = contactList.map(contact=>contact._id).indexOf(contactObj._id);
            contactList.splice(index,1,contactObj);
        }
    }else{
        contactList=[contactObj]
    }
    alert(contactObj.toString())
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    window.location.replace(site_properties.home_page);
}

const cancel = () => {
    window.location.replace(site_properties.home_page);
}

//If update is clicked, redirect to page
const checkForUpdate = () =>{
    const contactJSON = localStorage.getItem('editEmp');
    isUpdate = contactJSON ? true :false;
    if(!isUpdate) return;
    contactObj = JSON.parse(contactJSON);
    setForm();
}

//On clicking update, populate all the details alredy filled there
const setForm = () =>{
    document.querySelector('#name').value = contactObj._name;
    document.querySelector('#phone').value = contactObj._phone;
    document.querySelector('#address').value= contactObj._address;
    document.querySelector('#city').value = contactObj._city;
    document.querySelector('#state').value = contactObj._state;
    document.querySelector('#zip').value = contactObj._zip;
}