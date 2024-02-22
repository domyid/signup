import { onClick,getValue,setValue,hide,show,setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postWithToken,getWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";


hide("linkarea");
if (getCookie("login")===""){
    redirect("/");
}else{
    getWithHeader("https://mrt.ulbi.ac.id/notif/ux/getdatauser","login",getCookie("login"),getUserFunction)
}

onClick("saveForm",actionfunctionname);
onClick("copyurl",actionCopy);

function actionCopy(){
    navigator.clipboard.writeText(document.getElementById('urllaporan').innerHTML);
}

function actionfunctionname(){
    let laporan={
        no:getValue("no"),
        nama:getValue("nama"),
        phone:getValue("phone"),
        solusi:getValue("solusi")
    };
    hide("saveForm");
    postWithToken("https://mrt.ulbi.ac.id/notif/ux/postlaporan","login",getCookie("login"),laporan,responseFunction);
}
const katakata = "&#42;REMINDER&#42;%0AJika%20pelayanan%20anda%20sudah%20diberikan%20oleh%20staf%20kami&#44;akan%20masuk%20notifikasi%20dari%20iTeung%20untuk%20memberikan%20&#42;FEEDBACK%20RATING&#42;&#46%20Mohon%20untuk%20diisi%20Feedback%20Rating%20nya%20untuk%20kebutuhan%20penyelesaian%20solusi%20dari%20permasalahan%20yang%20ada&#46;%20Terima%20kasih&#46;" 
function responseFunction(result){
    if("wa" in result){
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Ingatkan user "+result.user+" untuk melakukan penilaian dari WA Iteung",
            footer: '<a href="https://wa.me/'+result.wa+'?text='+katakata+'">Kontak '+result.user+'</a>'
          });
          setValue("no","");
          setValue("nama","");
          setValue("phone","62");
          setValue("solusi","");
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
    setInner("header","Petugas : "+result.nama);
}