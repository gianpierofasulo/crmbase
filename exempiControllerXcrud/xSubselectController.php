<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xSubselectController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerName,city,creditLimit,Paid,Profit'); // specify only some columns
        $xcrud->subselect('Paid','SELECT SUM(amount) FROM payments WHERE customerNumber = {customerNumber}'); // other table
        $xcrud->subselect('Profit','{Paid}-{creditLimit}'); // current table
        $xcrud->sum('creditLimit,Paid,Profit'); // sum row(), receives data from full table (ignores pagination)
        $xcrud->change_type('Profit','price','0',array('prefix'=>'$')); // number format
        $render = $xcrud->render();                             
         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xSubselectController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->columns('customerName,city,creditLimit,Paid,Profit'); // specify only some columns
        $xcrud->subselect('Paid','SELECT SUM(amount) FROM payments WHERE customerNumber = {customerNumber}'); // other table
        $xcrud->subselect('Profit','{Paid}-{creditLimit}'); // current table
        $xcrud->sum('creditLimit,Paid,Profit'); // sum row(), receives data from full table (ignores pagination)
        $xcrud->change_type('Profit','price','0',array('prefix'=>'$')); // number format
        $render = $xcrud->render();           
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 


    }
}


