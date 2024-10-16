<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xRadioController extends Controller
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
        

        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xRadioController extends Controller
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


