import { onClick,getValue,hide,show,setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
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
    navigator.clipboard.writeText(getValue('urllaporan'));
}

function actionfunctionname(){
    let laporan={
        no:getValue("no"),
        nama:getValue("nama"),
        phone:getValue("phone"),
        solusi:getValue("solusi")
    };
    hide("contentform");
    postWithToken("https://mrt.ulbi.ac.id/notif/ux/postlaporan","login",getCookie("login"),laporan,responseFunction);
}

function responseFunction(result){
    show("linkarea");
    setInner("urllaporan","https://ux.ulib.ac.id/rate#"+result.data);
    console.log(result);
}


function getUserFunction(result){
    setInner("header","Petugas : "+result.nama);
}