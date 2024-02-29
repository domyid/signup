import { onClick,getValue,setValue,hide,show,setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postWithToken,getWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";


hide("linkarea");
if (getCookie("login")===""){
    Swal.fire({
        icon: "info",
        title: "<strong>Login <u>Dulu</u> Coy</strong>",
        html: `
        <div class="flex justify-center mt-2 mb-4" id="whatsauthqr">
        <svg class="lds-microsoft" width="80px"  height="80px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0)"><circle cx="81.73413361164941" cy="74.35045716034882" fill="#e15b64" r="5" transform="rotate(340.001 49.9999 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="0s"></animateTransform>
                      </circle><circle cx="74.35045716034882" cy="81.73413361164941" fill="#f47e60" r="5" transform="rotate(348.352 50.0001 50.0001)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.0625s"></animateTransform>
                      </circle><circle cx="65.3073372946036" cy="86.95518130045147" fill="#f8b26a" r="5" transform="rotate(354.236 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.125s"></animateTransform>
                      </circle><circle cx="55.22104768880207" cy="89.65779445495241" fill="#abbd81" r="5" transform="rotate(357.958 50.0002 50.0002)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.1875s"></animateTransform>
                      </circle><circle cx="44.77895231119793" cy="89.65779445495241" fill="#849b87" r="5" transform="rotate(359.76 50.0064 50.0064)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.25s"></animateTransform>
                      </circle><circle cx="34.692662705396415" cy="86.95518130045147" fill="#e15b64" r="5" transform="rotate(0.183552 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.3125s"></animateTransform>
                      </circle><circle cx="25.649542839651176" cy="81.73413361164941" fill="#f47e60" r="5" transform="rotate(1.86457 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.375s"></animateTransform>
                      </circle><circle cx="18.2658663883506" cy="74.35045716034884" fill="#f8b26a" r="5" transform="rotate(5.45126 50 50)">
                        <animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.4375s"></animateTransform>
                      </circle><animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;0 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s"></animateTransform></g>
        </svg>
        </div>
        <p class="font-bold text-center mb-4" id="whatsauthcounter">counter</p>
        <script type="module">
        try {
            import wAuth from "https://ux.ulbi.ac.id/auth/whatsauth.js";
            wAuth();
            console.log("jalan js");
        } catch (error) {
            console.error("Error importing or executing whatsauth.js:", error);
        }
        </script>
        `
      });
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
            footer: '<a href="https://wa.me/'+result.wa+'?text='+katakata+'" target="_blank">Kontak '+result.user+'</a>'
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