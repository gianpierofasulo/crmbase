<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xMultipleInstancesController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('orders');

        $xcrud2 = Xcrud_get_instance();
        $xcrud2->table('payments');

        $render = $xcrud->render();   
        $render2 = $xcrud2->render();
        
        return view('xcrud_simple', ['render' => $render,'render2' => $render2]);

        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xMultipleInstancesController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('orders');

        $xcrud2 = Xcrud_get_instance();
        $xcrud2->table('payments');

        $render = $xcrud->render();   
        $render2 = $xcrud2->render();                         
        return view('xcrud_simple', ['render' => $render,'render2' => $render2]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render,'render2' => $render2, 'controllerCode' => $controllerCode]); 


    }
}


