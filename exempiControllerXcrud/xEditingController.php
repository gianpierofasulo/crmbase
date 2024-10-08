<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xEditingController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table_name('Payments - Single click cell to edit!');
        $xcrud->table('payments');
        $xcrud->unset_remove();
        $xcrud->fields_inline('customerNumber,checkNumber,paymentDate,amount');//set the fields to allow inline editing
        $xcrud->unset_edit();
        $xcrud->set_logging(true);
        $render = $xcrud->render();                             

        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xEditingController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table_name('Payments - Single click cell to edit!');
        $xcrud->table('payments');
        $xcrud->unset_remove();
        $xcrud->fields_inline('customerNumber,checkNumber,paymentDate,amount');//set the fields to allow inline editing
        $xcrud->unset_edit();
        $xcrud->set_logging(true);
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);



    }
}


