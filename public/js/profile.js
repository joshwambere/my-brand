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
            <td><button>
                                                <ion-icon name="add-circle-outline"></ion-icon>
                                            </button></td>
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



let savedata=document.getElementById('saveInfo');
savedata.addEventListener('click',(e)=>{
    e.preventDefault();
    
    db.collection('users').add({
        Sname:skilltable.rows.time[1],
    })
})