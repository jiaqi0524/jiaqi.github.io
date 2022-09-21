<?php

class seo_index extends Base{
    function ac_make(){
        $templet = SEOTEMPLETS."/admin/makehtml.htm";
        $this->LoadTemplate($templet);
        $this->Display();
    }
    
    function ac_xml()
    {
        global $cfg_basedir,$cfg_cmspath;
        require_once(DEDEINC."/arc.partview.class.php");
        $murl = $cfg_cmspath."/sitemap.xml";
        $tmpfile = SEOTEMPLETS."/admin/sitemap.xml";
        $pv = new PartView();
        $pv->SetTemplet($tmpfile);
        $pv->SaveToHtml($cfg_basedir.$murl);
        echo "<a href='$murl' target='_blank'>成功更新文件: $murl 浏览...</a>";
        exit();
    }
    
    function ac_txt()
    {
        global $cfg_basehost,$cfg_basedir,$cfg_cmspath,$cfg_multi_site,$dsql;
        $str = $cfg_basehost."\r\n";
        $murl = $cfg_basedir.$cfg_cmspath."/sitemap.txt";
        $dsql->Execute('me',"SELECT * FROM #@__arctype");
        while($arcRow = $dsql->GetArray())
        {
            $typeurl = GetTypeUrl($arcRow['id'],$arcRow['typedir'],$arcRow['isdefault'],$arcRow['defaultname'],
                        $arcRow['ispart'],$arcRow['namerule2'],$arcRow['moresite'],$arcRow['siteurl'],$arcRow['sitepath']);
             
            if($cfg_multi_site == 'N' && $arcRow['ispart'] != 2)
            {
                $str .= $cfg_basehost.$typeurl."\r\n";
            }else{
                $str .= $typeurl."\r\n";
            }
        }
        $query = "Select arc.id,arc.title,arc.shorttitle,arc.typeid,arc.ismake,arc.senddate,arc.arcrank,arc.money,arc.filename,arc.litpic,
                            t.typedir,t.typename,t.namerule,t.namerule2,t.ispart,t.moresite,t.siteurl,t.sitepath
                            from `#@__archives` arc left join #@__arctype t on arc.typeid=t.id  WHERE arc.ismake > 0 ";
        $dsql->Execute('a1',$query);
        while($aRow = $dsql->GetArray('a1'))
        {
            $arcurl = GetFileUrl($aRow['id'],$aRow['typeid'],$aRow['senddate'],$aRow['title'],$aRow['ismake'],
                        $aRow['arcrank'],$aRow['namerule'],$aRow['typedir'],$aRow['money'],$aRow['filename'],$aRow['moresite'],$aRow['siteurl'],$aRow['sitepath']);
            if($cfg_multi_site == 'N')
            {
                $str .= $cfg_basehost.$arcurl."\r\n";
            }else{
                $str .= $arcurl."\r\n";
            }
        }
        file_put_contents($murl,$str);
        echo "<a href='/sitemap.txt' target='_blank'>成功更新文件: /sitemap.txt 浏览...</a>";
        exit();
    }
    
}