<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('base_fields');
        $xcrud->columns('text,date,bool');
        $xcrud->create_action('publish', 'publish_action'); // action callback, function publish_action() in functions.php
        $xcrud->create_action('unpublish', 'unpublish_action');
        $xcrud->button('#', 'unpublished', 'icon-close glyphicon glyphicon-remove', 'xcrud-action', 
            array(  // set action vars to the button
                'data-task' => 'action',
                'data-action' => 'publish',
                'data-primary' => '{id}'), 
            array(  // set condition ( when button must be shown)
                'bool',
                '!=',
                '1')
        );
        $xcrud->button('#', 'published', 'icon-checkmark glyphicon glyphicon-ok', 'xcrud-action', array(
            'data-task' => 'action',
            'data-action' => 'unpublish',
            'data-primary' => '{id}'), array(
            'bool',
            '=',
            '1'));
        $render = $xcrud->render();

        $controllerCode = <<<'EOD'
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('base_fields');
        $xcrud->columns('text,date,bool');
        $xcrud->create_action('publish', 'publish_action'); // action callback, function publish_action() in functions.php
        $xcrud->create_action('unpublish', 'unpublish_action');
        $xcrud->button('#', 'unpublished', 'icon-close glyphicon glyphicon-remove', 'xcrud-action', 
            array(  // set action vars to the button
                'data-task' => 'action',
                'data-action' => 'publish',
                'data-primary' => '{id}'), 
            array(  // set condition ( when button must be shown)
                'bool',
                '!=',
                '1')
        );
        $xcrud->button('#', 'published', 'icon-checkmark glyphicon glyphicon-ok', 'xcrud-action', array(
            'data-task' => 'action',
            'data-action' => 'unpublish',
            'data-primary' => '{id}'), array(
            'bool',
            '=',
            '1'));
        $render = $xcrud->render();

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


