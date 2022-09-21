<?php
$z[0]=Array("global","",123,150);
$z[0][4]=array();
$z[0][4]['name']="cfg_basehost";
$z[1]=Array("field","@me=date(\"Y-m-d\");",173,248);
$z[1][4]=array();
$z[1][4]['name']="shownowtime";
$z[1][4]['runphp']="yes";
$z[2]=Array("channel","\r\n<url>\r\n\r\n<loc>[field:typedir runphp='yes']if(strpos(@me,\"{cmspath}\") !== false){@me=str_replace('{cmspath}',\$GLOBALS['cfg_basehost'],@me);}[/field:typedir]</loc>\r\n\r\n<changefreq>daily</changefreq>\r\n\r\n<priority>0.8</priority>\r\n\r\n</url>\r\n",341,619);
$z[2][4]=array();
$z[2][4]['type']="top";
$z[3]=Array("arclist","\r\n   <url>\r\n      <loc>[field:aid runphp='yes']if(\$GLOBALS['cfg_multi_site']=='N'){@me=\$GLOBALS['cfg_basehost'];}[/field:aid][field:arcurl /]</loc>\r\n   <lastmod>[field:stime /]</lastmod>\r\n   </url>\r\n   ",626,885);
$z[3][4]=array();
$z[3][4]['row']="50000";
$z[3][4]['orderby']="pubdate";

?>