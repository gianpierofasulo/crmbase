<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xBaseController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        if(isset($_SESSION["lang"])){
            $xcrud->language($_SESSION["lang"]);
            $language =  $_SESSION["lang"];
        }else{
            $xcrud->language('en');
            $language =  "en";
        }
 
        $xcrud->table('base_fields');
        $xcrud->no_editor('text_area');
 
        $xcrud->fields("text,text_area,text_editor,integer,float,price,range,enum,set,date,datetime,time,bool,point,radio,radio_custom,radio_switch,drawing");
        $xcrud->fields_arrange("text,text_area,text_editor","Text",true);
        $xcrud->fields_arrange("integer,float,price,range","Numerals",true);
     
        $xcrud->fields_arrange("enum,set,bool,radio,radio_custom,radio_switch","Options/Collection",true);
        $xcrud->fields_arrange("date,datetime,time","Date & Time",true);
        $xcrud->fields_arrange("point,xx1","Map",true);
        $xcrud->change_type("radio","radio","",array("Yes"=>"Yes","No"=>"No"));
        $xcrud->change_type("radio_custom","radio_buttons","",array("Yes"=>"Yes","No"=>"No"));
        $xcrud->change_type("range","range","12",array(0=>"0",150=>"150"));
        $xcrud->change_type("radio_switch","switch","",array("Yes"=>"Yes"));
 
        $xcrud->change_type('price', 'price','0',array('prefix'=>'€'));
 
        //$xcrud->column_callback("radio_switch","getStatusSwitchRadio");
        //$xcrud->field_callback("radio_switch","getStatusSwitchRadio_Edit");
 
        $xcrud->change_type("drawing","drawing");
        $xcrud->fields_arrange("drawing","Signature",true);
 
        $xcrud->label("radio_custom","Custom Radio");
 
        $xcrud->create_field("xx1","select","",array("Yes"=>"Yes","No"=>"No"));
        $render = $xcrud->render('create');

$controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xBaseController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        if(isset($_SESSION["lang"])){
            $xcrud->language($_SESSION["lang"]);
            $language =  $_SESSION["lang"];
        }else{
            $xcrud->language('en');
            $language =  "en";
        }
 
        $xcrud->table('base_fields');
        $xcrud->no_editor('text_area');
 
        $xcrud->fields("text,text_area,text_editor,integer,float,price,range,enum,set,date,datetime,time,bool,point,radio,radio_custom,radio_switch,drawing");
        $xcrud->fields_arrange("text,text_area,text_editor","Text",true);
        $xcrud->fields_arrange("integer,float,price,range","Numerals",true);
     
        $xcrud->fields_arrange("enum,set,bool,radio,radio_custom,radio_switch","Options/Collection",true);
        $xcrud->fields_arrange("date,datetime,time","Date & Time",true);
        $xcrud->fields_arrange("point,xx1","Map",true);
        $xcrud->change_type("radio","radio","",array("Yes"=>"Yes","No"=>"No"));
        $xcrud->change_type("radio_custom","radio_buttons","",array("Yes"=>"Yes","No"=>"No"));
        $xcrud->change_type("range","range","12",array(0=>"0",150=>"150"));
        $xcrud->change_type("radio_switch","switch","",array("Yes"=>"Yes"));
 
        $xcrud->change_type('price', 'price','0',array('prefix'=>'€'));
 
        //$xcrud->column_callback("radio_switch","getStatusSwitchRadio");
        //$xcrud->field_callback("radio_switch","getStatusSwitchRadio_Edit");
 
        $xcrud->change_type("drawing","drawing");
        $xcrud->fields_arrange("drawing","Signature",true);
 
        $xcrud->label("radio_custom","Custom Radio");
 
        $xcrud->create_field("xx1","select","",array("Yes"=>"Yes","No"=>"No"));
        $render = $xcrud->render('create');

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


