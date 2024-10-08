<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xManyToManyController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerNumber,Customer orders,city');
        $xcrud->fk_relation('Customer orders','customerNumber','customers_orders_fk','customer_id','order_id','orders','orderNumber',array('orderNumber','orderDate'));
        $render = $xcrud->render();                             
         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xManyToManyController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerNumber,Customer orders,city');
        $xcrud->fk_relation('Customer orders','customerNumber','customers_orders_fk','customer_id','order_id','orders','orderNumber',array('orderNumber','orderDate'));
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 


    }
}


