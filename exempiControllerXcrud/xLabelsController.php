<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xLabelsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->label('lastName','Surname');
        $xcrud->label('firstName','Name');
        $xcrud->label('officeCode','Office code')->label('reportsTo','Reports to')->label('jobTitle','Job title');
        $xcrud->column_name('firstName', 'NaMe!'); // only column renaming
        $xcrud->column_class('extension','align-center font-bold'); // any classname
         $render = $xcrud->render();
        // predefined classnames: align-left, align-right, align-center, font-bold, font-italic, text-underline
                $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xLabelsController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->label('lastName','Surname');
        $xcrud->label('firstName','Name');
        $xcrud->label('officeCode','Office code')->label('reportsTo','Reports to')->label('jobTitle','Job title');
        $xcrud->column_name('firstName', 'NaMe!'); // only column renaming
        $xcrud->column_class('extension','align-center font-bold'); // any classname
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 

    }
}


