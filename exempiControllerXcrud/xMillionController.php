<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xMillionController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('million');
        $xcrud->limit_list('20,50,100,1000'); // do not use 'all' for large tables
        $xcrud->benchmark(); // lets see performance
        $render = $xcrud->render();                             
        

         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xMillionController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('million');
        $xcrud->limit_list('20,50,100,1000'); // do not use 'all' for large tables
        $xcrud->benchmark(); // lets see performance
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 



    }
}


