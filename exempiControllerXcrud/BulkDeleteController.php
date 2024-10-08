<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BulkDeleteController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('million');
        $xcrud->limit_list('20,50,100,1000'); // do not use 'all' for large tables
        $xcrud->bulk_select_position('left'); //It can be 'left' or 'right'
        $xcrud->set_bulk_select(false);
        $xcrud->set_bulk_select(false,'cd_key','=','EBGC57SXM-VW47I6AF-401X7DYM');//Dont be able to select records with ID 287846
        $xcrud->unset_remove(true,'cd_key','=','EBGC57SXM-VW47I6AF-401X7DYM');
        $xcrud->create_action('bulk_delete', 'bulk_delete'); // action callback, function publish_action() in functions.php                             
        $render = $xcrud->render();

               $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BulkDeleteController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('million');
        $xcrud->limit_list('20,50,100,1000'); // do not use 'all' for large tables
        $xcrud->bulk_select_position('left'); //It can be 'left' or 'right'
        $xcrud->set_bulk_select(false);
        $xcrud->set_bulk_select(false,'cd_key','=','EBGC57SXM-VW47I6AF-401X7DYM');//Dont be able to select records with ID 287846
        $xcrud->unset_remove(true,'cd_key','=','EBGC57SXM-VW47I6AF-401X7DYM');
        $xcrud->create_action('bulk_delete', 'bulk_delete'); // action callback, function publish_action() in functions.php                             
        $render = $xcrud->render();

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


