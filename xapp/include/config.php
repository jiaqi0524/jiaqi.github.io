<?php
require_once(dirname(__file__)."/../../include/common.inc.php");
require_once(DEDEINC."/dedetemplate.class.php");
require_once(DEDEINC."/datalistcp.class.php");
require_once(DEDEINC."/request.class.php");
require_once(DEDEINC.'/userlogin.class.php');

define(SEOINC,DEDEROOT."/xapp/include");
define(SEOTEMPLETS,DEDEROOT."/xapp/templets");
define(SEOCONTROL,DEDEROOT."/xapp/control");
define(SEOMODEL,DEDEROOT."/xapp/moudle");
define(SEODATA,DEDEROOT."/xapp/data");

//检验用户登录状态
$cuserLogin = new userLogin();
if($cuserLogin->getUserID()==-1 && $m == 'admin')
{
    ShowMsg("您无权登录此页面",'/');
    exit();
}

//引入控制器基类
require_once(SEOINC."/base.class.php");
$base = new Base();



function RunSeoApp($m,$c,$a)
{
    $m = request("m","index");
    $c = request("c","index");
    $a = request("a","index");
    
    $appfile = SEOCONTROL.'/'.$m.'/action_'.$c.'.php';
    if(file_exists($appfile))
    {
        require_once($appfile);
    }else{
        Die("CONTROL NOT EXISTS");
    }
    
    $className = "seo_".$c;
    $functionName = "ac_".$a;
    $cons = new $className();
    
    if(method_exists($cons,$functionName) == TRUE)
    {
        $cons->$functionName();
    }else{
        Die("MODELS NOT EXISTS");
    }
}