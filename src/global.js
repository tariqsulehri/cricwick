// import {Telco} from './telco';
import config from './config.json';

export const Globals = {og:{}, login:{}}


// !!!!!!!!!!!~~~~~CREATE A FILE AND ADD TELCO~~~~~!!!!!!!!!!!
// !!!!!!!!!!!  src/telco.js                       !!!!!!!!!!!
// !!!!!!!!!!!  export const Telco = "mobilink";   !!!!!!!!!!!

let version ='2.0';
const Telco = config.telco;

if(Telco === 'mobilink'){
   
    Globals.selectedTelco = "Mobilink";
      
    // Globals.ApiUrl = "http://54.245.34.7:8080/";//staging
    Globals.ApiUrl = "https://back.cricwick.net/";//live
    // Globals.pusherKey = "96a11f3e2f71d6b34e4f";//staging
    Globals.pusherKey = "44382e5777aebbc67aad";//live
    Globals.Api2 = "https://mobisub.cricwick.mobi/main/";
    Globals.NodeApi = "https://staging.cricwick.net:13002/";
    // Globals.NodeApi = "http://localhost:3002/";

    Globals.ssl = true;
    Globals.firebase = true;

    Globals.allowLowBalance = true;

    Globals.logo = "/images/mobilink/jazz_logo.png?v=1";
    Globals.imgRightAppDownload = "/images/mobilink/app_download.png";
    Globals.title = "Jazz Cricket - Enjoy live cricket and watch key cricket moments";

    Globals.telco = Telco;
    Globals.cssFor = Telco;

    ///////////// Amended By Tariq  ( REGEX FOR MOBILINK )  ////////////////////////////////////////////////////////////
    Globals.regex  = /^03\d{9}$|^3\d{9}$|^923\d{9}$|^0923\d{9}$/;  
   /// End Amended By Tariq //////////////////////////////////////////////////////////////////////////////////////////

    Globals.product = "Jazz Cricket";
    Globals.ios = "https://itunes.apple.com/pk/app/jazz-cricket/id1371362811?mt=8";
    Globals.androidMarket = 'market://details?id=com.Khaleef.CricWickMobilink';
    Globals.android = 'https://play.google.com/store/apps/details?id=com.Khaleef.CricWickMobilink';

    Globals.og.title = "Jazz Cricket";
    Globals.og.description = "Enjoy live cricket and watch key cricket moments";
    Globals.og.image = "/images/mobilink/og-image.jpg";

    Globals.login.enterNumber = 'Please Enter Your Number';
    Globals.login.phonePlaceholder = '03xx xxxx xxx';
    Globals.login.pinPlaceholder = 'XXXXX';
    Globals.login.enterPin = 'Please enter the Pin code you received in SMS. Prepaid users will be charged 2.38 per day.';
    Globals.login.image = "/images/mobilink/img-download.jpg";
    Globals.login.invalidPhone = "Please enter phone number in following format "+Globals.login.phonePlaceholder;

    Globals.placeholder4x3 = "/images/mobilink/placeholder4x3.jpg";
    Globals.placeholder16x9 = "/images/mobilink/placeholder16x9.jpg";
    Globals.placeholderVideo4x3 = "/images/mobilink/placeholderVideo4x3.jpg";    
    Globals.placeholderPlain4x3 = "/images/mobilink/placeholderPlain4x3.jpg";

}else if(Telco === 'ufone'){

  ///////////// Amended By Tariq  ( REGEX FOR MOBILINK )  ////////////////////////////////////////////////////////////
  Globals.regex  = /^03\d{9}$|^3\d{9}$|^923\d{9}$|^0923\d{9}$/;  
  /// End Amended By Tariq //////////////////////////////////////////////////////////////////////////////////////////

}else if(Telco === 'zain'){
    //zain ksa; cric.sa.zain.com
    // Globals.ApiUrl = "http://54.245.34.7:8080/";//staging
    Globals.ApiUrl = "https://back.cricwick.net/";//live
    // Globals.pusherKey = "96a11f3e2f71d6b34e4f";//staging
    Globals.pusherKey = "44382e5777aebbc67aad";//live
    Globals.Api2 = "http://mobisub.cricwick.mobi/main/";
    Globals.NodeApi = "https://staging.cricwick.net:13002/";
    // Globals.NodeApi = "http://localhost:3002/";

    Globals.ssl = false;
    Globals.firebase = false;

    Globals.allowLowBalance = true;

    Globals.logo = "/images/zain/cricwick-logo.jpg?v="+version;
    Globals.telcoLogo = "/images/zain/telco_logo.png";
    Globals.imgRightAppDownload = "/images/zain/app_download.png?v=11";
    Globals.title = "Cricwick - Enjoy live cricket and watch key cricket moments";

    Globals.telco = Telco;
    Globals.cssFor = Telco;

   ///////////// Amended By Tariq  ( REGEX FOR ZAIN ) ////////////////////////////////////////////////////////////
    Globals.regex  = /^9665\d{8}$|^05\d{8}$|^5\d{8}$|^009665\d{8}$|^\+9665\d{8}$|^\+009665\d{8}$|^966111111111$/;  
   /// End Amended By Tariq ///////////////////////////////
    
    Globals.product = "Cricwick";
    Globals.ios = "https://itunes.apple.com/us/app/cricwick/id1436495759?ls=1&mt=8";
    Globals.androidMarket = 'market://details?id=com.Khaleef.cricwick';
    Globals.android = 'https://play.google.com/store/apps/details?id=com.Khaleef.cricwick';
    

    Globals.og.title = "Cricwick";
    Globals.og.description = "Enjoy live cricket and watch key cricket moments";
    Globals.og.image = "";

    Globals.login.enterNumber = 'Please Enter Your Number';
    Globals.login.phonePlaceholder = '966 xxx xxx xxx';
    Globals.login.pinPlaceholder = 'XXXXX';
    Globals.login.enterPin = 'Please enter the Pin code you received in SMS.';
    Globals.login.image = "/images/zain/img-download.jpg?v="+version;
    Globals.login.invalidPhone = "Please enter phone number in following format "+Globals.login.phonePlaceholder;

    Globals.placeholder4x3 = "/images/zain/placeholder4x3.jpg";
    Globals.placeholder16x9 = "/images/zain/placeholder16x9.jpg";
    Globals.placeholderVideo4x3 = "/images/zain/placeholderVideo4x3.jpg";    
    Globals.placeholderPlain4x3 = "/images/zain/placeholderPlain4x3.jpg";

}else{
    // Globals.ApiUrl = "http://54.245.34.7:8080/";//staging
    Globals.ApiUrl = "https://back.cricwick.net/";//live
    // Globals.pusherKey = "96a11f3e2f71d6b34e4f";//staging
    Globals.pusherKey = "44382e5777aebbc67aad";//live
    Globals.Api2 = "https://mobisub.cricwick.mobi/main/";
    // Globals.NodeApi = "http://localhost:3002/"; //staging
    // Globals.NodeApi = "http://staging.cricwick.net:3002/";//non ssl live
    Globals.NodeApi = "https://staging.cricwick.net:13002/";//ssl live

    Globals.ssl = true;
    Globals.firebase = false;

    Globals.allowLowBalance = true;

    Globals.logo = "/images/cricwick/cricwick-logo.jpg?v=1";
    Globals.imgRightAppDownload = "/images/cricwick/app_download.png?v="+version;
    Globals.title = "Cricwick - Enjoy live cricket and watch key cricket moments";

    ////////////////////// Modification Area By Tariq ///////////////////////// 
    Globals.telco = '';
    Globals.cssFor = Telco;

    Globals.product = "Cricwick";
    Globals.ios = 'market://';
    Globals.android = 'https://play.google.com/store/apps/details?id=com.Khaleef.cricwick';
    Globals.androidMarket = 'market://details?id=com.Khaleef.cricwick';

    Globals.og.title = "Cricwick";
    Globals.og.description = "Enjoy live cricket and watch key cricket moments";
    Globals.og.image = "";

    Globals.login.enterNumber = 'Please Enter Your Number';
    Globals.login.phonePlaceholder = '03xx xxxx xxx';
    Globals.login.pinPlaceholder = 'XXXXX';
    Globals.login.enterPin = 'Please enter the Pin code you received in SMS.';
    Globals.login.image = "/images/cricwick/img-download.jpg?v="+version;
    Globals.login.invalidPhone = `Please enter phone number in following format ${Globals.login.phonePlaceholder}`;
    Globals.login.chooseTelco = "Please Select Your Network Operator";
    // Globals.login.chooseTelco = "Please Choose Your Operator";

    Globals.telcos = [
        {
            telco: "telenor",
            name: "telenor (PK)", 
            b: "mobilink",
            regex: /^03\d{9}$|^3\d{9}$|^923\d{9}$|^0923\d{9}$/,  // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: Globals.login.phonePlaceholder,
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                invalidPhone: Globals.login.invalidPhone
            }
        },
        {
            telco: "zong",
            name: "zong (PK)", 
            b: "mobilink", 
            regex: /^03\d{9}$|^3\d{9}$|^923\d{9}$|^0923\d{9}$/,  // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: Globals.login.phonePlaceholder,
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                invalidPhone: Globals.login.invalidPhone
            }
        },
        {
            telco: "mobily",
            name: "mobily (KSA)", 
            b: "zain", 
            regex:/^9665\d{8}$|^05\d{8}$|^5\d{8}$|^009665\d{8}$|^\+9665\d{8}$|^\+009665\d{8}$|^966111111111$/, // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "966xxxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 966xxxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        },
        {
            telco: "stc",
            name: "STC (KSA)", 
            b: "zain", 
            regex:/^9665\d{8}$|^05\d{8}$|^5\d{8}$|^009665\d{8}$|^\+9665\d{8}$|^\+009665\d{8}$|^966111111111$/, // Amended By Tariq Sulehri
            telco_message: "*Billing enabled by STC - 0.65SAR / Day",
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "966xxxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 966xxxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        },
        {
            telco: "zain_bh",
            name: "Zain (BH)", 
            b: "zain", 
            regex:/^9733\d{7}$|^03\d{7}$|^9661111111\d{2}$|^3\d{7}$/, // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "973xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 966xxxxxxxxx" // Amended By Tariq Sulehri
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        },
        {
            telco: "zain_kw",
            name: "Zain (KW)", 
            b: "zain", 
            regex: /^965\d{8}$|^05\d{8}$|^5\d{8}$|^9661111111\d{2}$/, // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "965xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 965xxxxxxxx" // Amended By Tariq Sulehri
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        },
        {
            telco: "ooredoo",
            name: "Ooredoo (QA)", 
            b: "zain", 
            regex:/^9661111111\d{2}$|974\d{8}$|055\d{6}$|033\d{6}$|066\d{6}$/, // Amended By Tariq Sulehri
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "974xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 974xxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        },
        {
            telco: "ooredoo_kw",
            name: "Ooredoo (KW)", 
            b: "zain",
            regex:/^9661111111\d{2}$|974\d{8}$|055\d{6}$|033\d{6}$|066\d{6}$/, // Amended By Tariq Sulehri
            consentGatewayRedirection: true,
            cgRedirectionUrl: window.location.origin+"/cgauth/",
            cgUrl : `http://galaxylp.mobi-mind.net/?Id=703,CRICKWICK,965,2695,45,${window.location.origin}${"/cgauth/"}${",0,41903,4545"}`, 
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "974xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 974xxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        }, 
        {
            telco: "bbh",
            name: "Batelco (BH)", 
            b: "zain",
            regex:/^9661111111\d{2}$|974\d{8}$|055\d{6}$|033\d{6}$|066\d{6}$/, // Amended By Tariq Sulehri
            consentGatewayRedirection: true,
            cgRedirectionUrl: window.location.origin+"/cgauth/",
            cgUrl : "http://galaxylp.mobi-mind.net/?Id=701,CRICKWICK,973,2695,45,"+ window.location.origin+"/cgauth/" +",0,42601,4542&IURL=http://galaxylp.mobi-mind.net/Cricwick/banner.jpg&MM_languageId=3",
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "974xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 974xxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        }, 
        {
            telco: "viva",
            name: "Viva (KW)", 
            b: "zain",
            regex:/^9661111111\d{2}$|974\d{8}$|055\d{6}$|033\d{6}$|066\d{6}$/, // Amended By Tariq Sulehri
            consentGatewayRedirection: true,
            cgRedirectionUrl: window.location.origin+"/cgauth/",
            cgUrl : "http://galaxylp.idextelecom.com/?Id=257,Cricket,965,8769,18,"+ window.location.origin+"/cgauth/" + ",0,41904,2395",
            login:{
                enterNumber: Globals.login.enterNumber,
                phonePlaceholder: "974xxxxxxxx",
                pinPlaceholder: Globals.login.pinPlaceholder,
                enterPin: Globals.login.enterPin,
                image: Globals.login.image,
                // invalidPhone: "Please enter phone number in following format" + " 974xxxxxxxx"
                invalidPhone: `Please enter phone number in following format ${Globals.login.phonePlaceholder}`
            }
        }
                
    ];

    Globals.placeholder4x3 = "/images/cricwick/placeholder4x3.jpg";
    Globals.placeholder16x9 = "/images/cricwick/placeholder16x9.jpg";
    Globals.placeholderVideo4x3 = "/images/cricwick/placeholderVideo4x3.jpg";    
    Globals.placeholderPlain4x3 = "/images/cricwick/placeholderPlain4x3.jpg";
}
