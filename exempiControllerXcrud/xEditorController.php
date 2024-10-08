<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xEditorController extends Controller
{
    public function index()
    {
        
        $xcrud = Xcrud_get_instance();

        //Xcrud_config::$editor_url = dirname($_SERVER["SCRIPT_NAME"]).'/../editors/ckeditor/ckeditor.js'; // can be set in config

        $xcrud->table('orders');
        $xcrud->change_type('status','select','','On Hold,In Process,Resolved,Shipped,Disputed,Cancelled');
        $xcrud->change_type('orderDate','none');
        $xcrud->change_type('description','texteditor');
        $render = $xcrud->render();                             

         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xEditorController extends Controller
{
    public function index()
    {
        $xcrud->table('orders');
        $xcrud->change_type('status','select','','On Hold,In Process,Resolved,Shipped,Disputed,Cancelled');
        $xcrud->change_type('orderDate','none');
        $xcrud->change_type('description','texteditor');
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


