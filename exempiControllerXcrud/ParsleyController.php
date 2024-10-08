<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParsleyController extends Controller
{
    public function index()
    {
        $xcrud = Xcrud_get_instance();
        $xcrud->table('employees');
        $xcrud->set_attr('lastName',array('id'=>'user','data-role'=>'admin')); 
        //Activate parslet validation
        $xcrud->parsley_active(true);
        //Make extension mandatory
        $xcrud->set_attr('extension',array('required'=>'required'));
        //Ensure First Name is alpha numeric    
        $xcrud->set_attr('firstName',array('data-parsley-trigger'=>'change','required'=>'required','id'=>'user','data-parsley-type'=>'alphanum'));
        $xcrud->set_attr('lastName',array('data-parsley-trigger'=>'change','required'=>'required','id'=>'user','data-parsley-type'=>'alphanum'));
        //ensure valid email and display "Email not valid"
        $xcrud->set_attr('email',array('data-parsley-trigger'=>'change','id'=>'user','data-parsley-type'=>'email',
        'data-parsley-error-message'=>"Email not valid"));   
        //ensure office Code is between 3 and 5 number characters
        $xcrud->set_attr('officeCode',array('id'=>'user','data-parsley-type'=>'digits','data-parsley-length'=>"[3,5]"));                                   
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
        $xcrud->set_attr('lastName',array('id'=>'user','data-role'=>'admin')); 
        //Activate parslet validation
        $xcrud->parsley_active(true);
        //Make extension mandatory
        $xcrud->set_attr('extension',array('required'=>'required'));
        //Ensure First Name is alpha numeric    
        $xcrud->set_attr('firstName',array('data-parsley-trigger'=>'change','required'=>'required','id'=>'user','data-parsley-type'=>'alphanum'));
        $xcrud->set_attr('lastName',array('data-parsley-trigger'=>'change','required'=>'required','id'=>'user','data-parsley-type'=>'alphanum'));
        //ensure valid email and display "Email not valid"
        $xcrud->set_attr('email',array('data-parsley-trigger'=>'change','id'=>'user','data-parsley-type'=>'email',
        'data-parsley-error-message'=>"Email not valid"));   
        //ensure office Code is between 3 and 5 number characters
        $xcrud->set_attr('officeCode',array('id'=>'user','data-parsley-type'=>'digits','data-parsley-length'=>"[3,5]"));                                   

        return view('xcrud_simple', ['render' => $render]);
    }
}
EOD;

        return view('xcrud_simple', ['render' => $render, 'controllerCode' => $controllerCode]);


    }
}


