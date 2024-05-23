import { onClick,getValue,setValue,hide,show,setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postJSON,getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

const urlGetDataUser="https://api.do.my.id/data/user";
const urlPostDataUser="https://api.do.my.id/data/user";
// Fungsi untuk menutup SweetAlert
function closeSweetAlert() {
    Swal.close();
    getJSON(urlGetDataUser,"login",getCookie("login"),getUserFunction);
    show("saveForm");
}
// Mengecek Cookies Login
if (getCookie("login")===""){
    redirect("/signin");
}else{
    getJSON(urlGetDataUser,"login",getCookie("login"),getUserFunction);
}

onClick("saveForm",actionfunctionname);
//onClick("copyurl",actionCopy);

function actionCopy(){
    navigator.clipboard.writeText(document.getElementById('urllaporan').innerHTML);
}

function actionfunctionname(){
    let user={
        email:getValue("email"),
        githubusername:getValue("github"),
        gitlabusername:getValue("gitlab"),
        GitHostUsername:getValue("githost")
    };
    if (getCookie("login")===""){
        redirect("/signin");
    }else{
        postJSON(urlPostDataUser,"login",getCookie("login"),user,responseFunction);
        hide("saveForm");
    }  
}

function responseFunction(result){
    if(result.status === 200){
        const katakata = "&#42;REMINDER&#42;%0AJika%20pelayanan%20anda%20sudah%20diberikan%20oleh%20staf%20kami&#44;akan%20masuk%20notifikasi%20dari%20iTeung%20untuk%20memberikan%20&#42;FEEDBACK%20RATING&#42;&#46%20Mohon%20untuk%20diisi%20Feedback%20Rating%20nya%20untuk%20kebutuhan%20penyelesaian%20solusi%20dari%20permasalahan%20yang%20ada&#46;%20Terima%20kasih&#46;"
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Ingatkan user "+result.user+" untuk melakukan penilaian dari WA Iteung",
            footer: '<a href="https://wa.me/'+result.wa+'?text='+katakata+'" target="_blank">Kontak '+result.user+'</a>'
          });
          setValue("no",result.data.phonenumber);
          setValue("nama",result.data.name);
          setValue("email",result.data.phonenumber);
          setValue("github",result.data.githubusername);
          setValue("gitlab",result.data.gitlabusername);
          setValue("githost",result.data.githostusername); 
          show("saveForm");
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.error
          });
          show("saveForm");
    }
    console.log(result);
}


function getUserFunction(result){
  setValue("no",result.data.phonenumber);
  setValue("nama",result.data.name);
  if (result.status!==404){
    setValue("email",result.data.phonenumber);
    setValue("github",result.data.githubusername);
    setValue("gitlab",result.data.gitlabusername);
    setValue("githost",result.data.githostusername); 
  }
}