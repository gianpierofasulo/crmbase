<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xColumnsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerName,phone,city,country'); // columns in grid
        $xcrud->fields('customerName,creditLimit,salesRepEmployeeNumber'); // fields in details
        $render = $xcrud->render();                             
        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xColumnsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerName,phone,city,country'); // columns in grid
        $xcrud->fields('customerName,creditLimit,salesRepEmployeeNumber'); // fields in details
        $render = $xcrud->render();     

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


