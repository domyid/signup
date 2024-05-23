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
        const katakata = "Verifikasi pendaftaran anggota "+result.data._id;
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Selamat kak "+result.data.name+" sudah terdaftar dengan ID: "+result.data._id,
            footer: '<a href="https://wa.me/62895601060000?text='+katakata+'" target="_blank">Verifikasi Pendaftaran</a>',
            didClose: () => {
              // Redirect ke halaman lain setelah SweetAlert ditutup
              redirect("/dashboard");
            }
          });
          setValue("no",result.data.phonenumber);
          setValue("nama",result.data.name);
          setValue("email",result.data.email);
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