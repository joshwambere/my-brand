/**
 * import firebase config file
*/
import {db}from './config.js';

const servicescard = document.getElementById('services');
const skillescard = document.getElementById('skills');

function renderService(doc) {
  
    servicescard.innerHTML += `
    <div class="jd-skills-box">
        <ion-icon name="${doc.data().serviceIcon}" class="services-Icons"></ion-icon>
        <h5 class="jd-tech-name">${doc.data().serviceName}</h5>
    </div>
        `

}

function renderSkills(doc) {
  
    skillescard.innerHTML += `
    <div class="jd-skills-box">
                    <img src="${doc.data().skillIcon}" alt="">
                    <h5 class="jd-tech-name">${doc.data().skillName}</h5>
    </div>
        `

}


db.collection('service').onSnapshot(snap =>{
    let changes=snap.docChanges();
    changes.forEach(change =>{
        if(change.type=='added'){
            renderService(change.doc);
            
        }
    })
})
db.collection('skills').onSnapshot(snap =>{
    let changes=snap.docChanges();
    changes.forEach(change =>{
        if(change.type=='added'){
            renderSkills(change.doc);
           
            
        }
    })
})