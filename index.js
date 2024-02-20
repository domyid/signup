import { onClick,getValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

if (getCookie("login")===""){
    redirect("/");
}

onClick("saveForm",actionfunctionname);

function actionfunctionname(){
    let laporan={
        no:getValue("no"),
        nama:getValue("nama"),
        phone:getValue("phone"),
        solusi:getValue("solusi")
    };

    postWithToken("https://mrt.ulbi.ac.id/notif/ux/postlaporan","login",getCookie("login"),laporan,responseFunction);

}

function responseFunction(result){
    console.log(result);
}