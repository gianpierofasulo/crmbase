<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TricksController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table("payments");
        $render = $xcrud->render();                             
        return view('xcrud_simple', ['render' => $render]);

    }
}


