<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xDateRangeController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('orders');
        $xcrud->fields('orderDate,requiredDate');
        $xcrud->change_type('orderDate', 'date', '', array('range_end' => 'requiredDate', 'placeholder' => 'Date from...'));
        $xcrud->change_type('requiredDate', 'date', '', array('range_start' => 'orderDate', 'placeholder' => 'Date to...'));
        $render = $xcrud->render('create');                            
        

         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xDateRangeController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('orders');
        $xcrud->fields('orderDate,requiredDate');
        $xcrud->change_type('orderDate', 'date', '', array('range_end' => 'requiredDate', 'placeholder' => 'Date from...'));
        $xcrud->change_type('requiredDate', 'date', '', array('range_start' => 'orderDate', 'placeholder' => 'Date to...'));
        $render = $xcrud->render('create');     

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);



    }
}


