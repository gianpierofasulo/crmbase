<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xRelationGroupingController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->table_name('Employees - Single click cell to edit! Save by Enter only');
        $xcrud->validation_required('lastName',2)->validation_required('firstName',2)->validation_required('jobTitle');
        $xcrud->validation_required('email');
        $xcrud->validation_pattern('email','email')->validation_pattern('extension','alpha_numeric')->validation_pattern('officeCode','natural');
        $xcrud->relation('officeCode','offices','officeCode','city');
        $xcrud->limit(10);
        $xcrud->group_by_columns(array('officeCode','city'));
        //$xcrud->group_sum_columns('officeCode');
     
        $xcrud->fields_inline('lastName,firstName,extension,email,officeCode,reportsTo,jobTitle');//set the fields to allow inline editing
        $xcrud->inline_edit_save('enter_only');// Can be 'enter_only' or 'button_only'  or 'enter_button_only'
        $xcrud->set_logging(true);
        $render = $xcrud->render();                             
         $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xRelationGroupingController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('gallery');
        $xcrud->change_type('image', 'image', false, array(
            'width' => 450,
            'path' => '../uploads/gallery',
            'thumbs' => array(array(
                    'height' => 55,
                    'width' => 120,
                    'crop' => true,
                    'marker' => '_th'))));
 
        $xcrud->column_callback("active","getStatusSwitchRadio_Gallery");
        $xcrud->create_action("deactivate_gallery","deactivate_gallery");
        $xcrud->create_action("activate_gallery","activate_gallery");
        $render = $xcrud->render();   
        return view('xcrud_simple', ['render' => $render]);
        
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]); 

    }
}


