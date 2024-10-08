<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xWidthCutController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('productlines');
        $xcrud->columns('productLine,textDescription');
        $xcrud->column_width('textDescription','80%');
        $xcrud->column_cut(250,'textDescription');
        $render = $xcrud->render();                             
         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xWidthCutController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('productlines');
        $xcrud->columns('productLine,textDescription');
        $xcrud->column_width('textDescription','80%');
        $xcrud->column_cut(250,'textDescription');
        $render = $xcrud->render();    
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;
 return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);

    }
}


