<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xModalController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('payments');
        $xcrud->is_edit_modal(true); 
        $render = $xcrud->render();                        

         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xModalController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('payments');
        $xcrud->is_edit_modal(true); 
        $render = $xcrud->render();                             
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 


    }
}


