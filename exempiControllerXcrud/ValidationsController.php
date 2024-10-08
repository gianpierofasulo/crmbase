<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidationsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->validation_required('lastName',2)->validation_required('firstName',2)->validation_required('jobTitle');
        $xcrud->validation_required('email');
        $xcrud->validation_pattern('email','email')->validation_pattern('extension','alpha_numeric')->validation_pattern('officeCode','natural');
        $xcrud->limit(10);
        $render = $xcrud->render();                             
        
        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ButtonsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->validation_required('lastName',2)->validation_required('firstName',2)->validation_required('jobTitle');
        $xcrud->validation_required('email');
        $xcrud->validation_pattern('email','email')->validation_pattern('extension','alpha_numeric')->validation_pattern('officeCode','natural');
        $xcrud->limit(10);
        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);

    }
}


