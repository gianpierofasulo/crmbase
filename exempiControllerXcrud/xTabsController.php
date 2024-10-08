<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xTabsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('users');
        $xcrud->fields('customerName,contactLastName,contactFirstName,phone', false, 'Contact');
        $xcrud->fields('addressLine1,addressLine2,city,state,postalCode,country', false, 'Address');
        $xcrud->fields('customerNumber,salesRepEmployeeNumber,creditLimit', false, 'Finance');
        $render = $xcrud->render('edit', 148);
         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xTabsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('customers');
        $xcrud->fields('customerName,contactLastName,contactFirstName,phone', false, 'Contact');
        $xcrud->fields('addressLine1,addressLine2,city,state,postalCode,country', false, 'Address');
        $xcrud->fields('customerNumber,salesRepEmployeeNumber,creditLimit', false, 'Finance');
        $render = $xcrud->render('edit', 148);
        return view('xcrud_simple', ['render' => $render]);

    }
}
EOD;
 return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);

    }
}


