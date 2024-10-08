<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xTooltipsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('payments');
        $xcrud->table_name('This is table name!','And this is table tooltip... And tested chars: ö,ü,ß');
        $xcrud->field_tooltip('checkNumber', 'Wow, check number? Really?');
        $xcrud->column_tooltip('customerNumber', 'Yeah! Column tooltip!');
        $render = $xcrud->render();                             
           $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xTooltipsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('payments');
        $xcrud->table_name('This is table name!','And this is table tooltip... And tested chars: ö,ü,ß');
        $xcrud->field_tooltip('checkNumber', 'Wow, check number? Really?');
        $xcrud->column_tooltip('customerNumber', 'Yeah! Column tooltip!');
        $render = $xcrud->render();           
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;
 return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);
    }
}


