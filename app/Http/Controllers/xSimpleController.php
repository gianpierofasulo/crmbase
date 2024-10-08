<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class xSimpleController extends Controller
{
    public function index(Request $request)
    {

        $xcrud = Xcrud_get_instance();
        $xcrud->table("sessions");
        $render = $xcrud->render();

        return view('xcrud_simple', ['render' => $render]);


    }
}


