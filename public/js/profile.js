/**
 * import firebase config file
*/
import {db}from './config.js';


const skillbtn=document.getElementById('skills-btn');
const skilltable=document.getElementById('skills-table');

let skilname=document.getElementById('skill-name');
let skillIcon=document.getElementById('skill-icon');

skillbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let name=skilname.value;
    let icon=skillIcon.value;
    let tableTemplate=`
        <tr>
            <td>${name}</td>
            <td>${icon}</td>
            <td><button> <ion-icon name="add-circle-outline"></ion-icon> </button></td>
        </tr>
    `;
    skilltable.innerHTML+=tableTemplate;
    skilname.value="";
    skillIcon.value="";
})

/////
const servicebtn=document.getElementById('service-btn');
const servicetable=document.getElementById('service-table');

let servicename=document.getElementById('service-name');
let serviceIcon=document.getElementById('service-icon');

servicebtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let name=servicename.value;
    let icon=serviceIcon.value;
    let tableTemplate=`
        <tr>
            <td>${name}</td>
            <td>${icon}</td>
            <td><button>
                                                <ion-icon name="add-circle-outline"></ion-icon>
                                            </button></td>
        </tr>
    `;
    servicetable.innerHTML+=tableTemplate;
    servicename.value="";
    serviceIcon.value="";
})

/////
const Pbtn=document.getElementById('info-btn');
const ptable=document.getElementById('p-table');

let Pname=document.getElementById('p-name');
let Pemail=document.getElementById('p-email');
let Pphone=document.getElementById('p-phone');
let Paddress=document.getElementById('p-address');

Pbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let name=Pname.value;
    let email=Pemail.value;
    let phone=Pphone.value;
    let address=Paddress.value;
    let tableTemplate=`
        <tr class="tbl">
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${address}</td>
            <td><button>
                                                <ion-icon name="add-circle-outline"></ion-icon>
                                            </button></td>
        </tr>
    `;
    ptable.innerHTML+=tableTemplate;
    Pname.value="";
    Pemail.value="";
    Pphone.value="";
    Paddress.value="";
})

/**
 * insert skill in skills collection
*/

let savedata=document.getElementById('saveInfo');
savedata.addEventListener('click',(e)=>{
    e.preventDefault();
    /**
     * insert service in service collection
    */
    for(var i=1;i< servicetable.getElementsByTagName('tr').length; i++){
        let serviceName=servicetable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText;
        let serviceIcon=servicetable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText;
        db.collection('service').add({
            serviceName:serviceName,
            serviceIcon:serviceIcon
        }).then(()=>{
            console.log('done');
        }).catch(function(error) {
                console.log("Error inserting the document:", error);
        });
            
    }

    /**
     * insert service in service collection
    */

    for(var i=1;i< skilltable.getElementsByTagName('tr').length; i++){
        let skillName=skilltable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText;
        let skillIcon=skilltable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText;
        db.collection('skills').add({
            skillName:skillName,
            skillIcon:skillIcon
        }).then(()=>{
            console.log('done');
        }).catch(function(error) {
                console.log("Error inserting the document:", error);
        });
            
    }
    /**
     * insert personl info in service collection
    */

   for(var i=1;i< ptable.getElementsByTagName('tr').length; i++){
    let pName=ptable.getElementsByTagName('tr')[i].getElementsByTagName('td')[0].innerText;
    let pEmail=ptable.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerText;
    let Pphone=ptable.getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerText;
    let Paddress=ptable.getElementsByTagName('tr')[i].getElementsByTagName('td')[3].innerText;
    db.collection('personal').add({
        pName:pName,
        pEmail:pEmail,
        Pphone:Pphone,
        Paddress:Paddress
    }).then(()=>{
        console.log('done');
    }).catch(function(error) {
            console.log("Error inserting the document:", error);
    });
        
}

})


