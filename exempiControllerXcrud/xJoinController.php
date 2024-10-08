<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xJoinController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->join('officeCode','offices','officeCode'); // ... INNER JOIN offices ON employees.officeCode = offices.officeCode ...
        $render = $xcrud->render();                             
        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xJoinController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->join('officeCode','offices','officeCode'); // ... INNER JOIN offices ON employees.officeCode = offices.officeCode ...
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


