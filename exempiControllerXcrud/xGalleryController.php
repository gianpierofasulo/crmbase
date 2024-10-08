<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xGalleryController extends Controller
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
        $render = $xcrud->render();                             
        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xGalleryController extends Controller
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
        $render = $xcrud->render();
        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);

    }
}


