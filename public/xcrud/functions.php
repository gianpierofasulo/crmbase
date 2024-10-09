<?php
include("functions_addons.php");
/**
 * Techbase Solutions (K) Commercial License
 *
 * This software is licensed under the Techbase Solutions (K) Extended License as attached with this software
 * You should have received a copy of the license along with this file. If not,
 * please contact Techbase Solutions (K) at xcrud17@gmail.com for a copy.
 *
 * Commercial use of this software is permitted only under the terms of the
 * Techbase Solutions (K) Commercial License. Redistributions and use in source
 * and binary forms, with or without modification, are strictly prohibited
 * unless explicitly granted by the Techbase Solutions (K) Commercial License.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * DO NOT REMOVE THIS LICENSE INFORMATION
 *
 * @copyright 2023 Techbase Solutions (K)
 * @license   https://xcrud.net
 * @email   xcrud17@gmail.com
 */
 ?>
<?php


function hash_password($postdata, $primary){
    $password = password_hash( $postdata->get('password'), PASSWORD_BCRYPT );
    $postdata->set('password',  $password);
}

function publish_action($xcrud)
{
    if ($xcrud->get('primary'))
    {
        $db = Xcrud_db::get_instance();
        $query = 'UPDATE base_fields SET `bool` = b\'1\' WHERE id = ' . (int)$xcrud->get('primary');
        $db->query($query);
    }
}

function get_pages(){
	foreach (new DirectoryIterator(__DIR__) as $file) {
	  if ($file->isFile()) {
	      print $file->getFilename() . "\n";
	  }
	}
}

function bulk_delete($xcrud)
{
	//print_r($xcrud.selected);
	$selected = $xcrud->get('selected');
	$table = $xcrud->get('table');
	$identifier = $xcrud->get('identifier');
	$cnt = count($selected);

	$insertString = "";
	$count = 0;
	foreach($selected as $value){
		$count++;
		if($count == 1){
			$insertString .= $value;
		}else{
			$insertString .= "," . $value;
		}
	}

    $db = Xcrud_db::get_instance();
    $query = "DELETE from $table WHERE $identifier IN ($insertString)" ;
	//echo $query;
    $db->query($query);

    $xcrud->set_exception('Bulk Delete', 'You have Deleted ' . $cnt . ' items', 'error');
	//$xcrud->set_exception('You have deleted ' . $cnt . ' items', 'error');
}

function unpublish_action($xcrud)
{
    if ($xcrud->get('primary'))
    {
        $db = Xcrud_db::get_instance();
        $query = 'UPDATE base_fields SET `bool` = b\'0\' WHERE id = ' . (int)$xcrud->get('primary');
        $db->query($query);
    }
}

function exception_example($postdata, $primary, $xcrud)
{
    // get random field from $postdata
    $postdata_prepared = array_keys($postdata->to_array());
    shuffle($postdata_prepared);
    $random_field = array_shift($postdata_prepared);
    // set error message
    $xcrud->set_exception($random_field, 'This is a test error', 'error');
}


function test_column_callback($value, $fieldname, $primary, $row, $xcrud)
{
    return $value . ' - nice!';
}



function after_upload_example($field, $file_name, $file_path, $params, $xcrud)
{
    $ext = trim(strtolower(strrchr($file_name, '.')), '.');
    if ($ext != 'pdf' && $field == 'uploads.simple_upload')
    {
        unlink($file_path);
        $xcrud->set_exception('simple_upload', 'This is not PDF', 'error');
    }
}

function movetop($xcrud)
{
    if ($xcrud->get('primary') !== false)
    {
        $primary = (int)$xcrud->get('primary');
        $db = Xcrud_db::get_instance();
        $query = 'SELECT `officeCode` FROM `offices` ORDER BY `ordering`,`officeCode`';
        $db->query($query);
        $result = $db->result();
        $count = count($result);

        $sort = array();
        foreach ($result as $key => $item)
        {
            if ($item['officeCode'] == $primary && $key != 0)
            {
                array_splice($result, $key - 1, 0, array($item));
                unset($result[$key + 1]);
                break;
            }
        }

        foreach ($result as $key => $item)
        {
            $query = 'UPDATE `offices` SET `ordering` = ' . $key . ' WHERE officeCode = ' . $item['officeCode'];
            $db->query($query);
        }
    }
}
function movebottom($xcrud)
{
    if ($xcrud->get('primary') !== false)
    {
        $primary = (int)$xcrud->get('primary');
        $db = Xcrud_db::get_instance();
        $query = 'SELECT `officeCode` FROM `offices` ORDER BY `ordering`,`officeCode`';
        $db->query($query);
        $result = $db->result();
        $count = count($result);

        $sort = array();
        foreach ($result as $key => $item)
        {
            if ($item['officeCode'] == $primary && $key != $count - 1)
            {
                unset($result[$key]);
                array_splice($result, $key + 1, 0, array($item));
                break;
            }
        }

        foreach ($result as $key => $item)
        {
            $query = 'UPDATE `offices` SET `ordering` = ' . $key . ' WHERE officeCode = ' . $item['officeCode'];
            $db->query($query);
        }
    }
}

function show_description($value, $fieldname, $primary_key, $row, $xcrud)
{
    $result = '';
    if ($value == '1')
    {
        $result = '<i class="fa fa-check" />' . 'OK';
    }
    elseif ($value == '2')
    {
        $result = '<i class="fa fa-circle-o" />' . 'Pending';
    }
    return $result;
}

function custom_field($value, $fieldname, $primary_key, $row, $xcrud)
{
    return '<input type="text" readonly class="xcrud-input" name="' . $xcrud->fieldname_encode($fieldname) . '" value="' . $value .
        '" />';
}
function unset_val($postdata)
{
    $postdata->del('Paid');
}

function before_list_example($list, $xcrud)
{
    var_dump($list);
}

function after_update_test($pd, $pm, $xc)
{
    $xc->search = 0;
}

/*function after_upload_test($field, &$filename, $file_path, $upload_config, $this)
{
    $filename = 'bla-bla-bla';
}*/


function after_insert($postdata, $primary, $xcrud){

}

function before_insert($postdata, $xcrud){


        $file_f = Xcrud_config::$upload_folder_def;
        //$postdata->set('password', sha1( $postdata->get('pdf_file') ));
        $file_path = $postdata->get('pdf_file');
        $full_f = $file_f . "/" . $file_path;

        echo $full_f;

        $fileContent = file_get_contents($full_f);

        // Get the MIME type of the file
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $full_f);
        finfo_close($finfo);

        // Create a blob from the file contents
        $blob = new \stdClass();
        $blob->content = base64_encode($fileContent);
        $blob->mime = $mimeType;
        $postdata->set('pdf_blob', json_encode($blob));

}

function before_update($postdata, $xcrud){


        $file_f = Xcrud_config::$upload_folder_def;
        //$postdata->set('password', sha1( $postdata->get('pdf_file') ));
        $file_path = $postdata->get('pdf_file');
        $full_f = $file_f . "/" . $file_path;

        echo $full_f;

        $fileContent = file_get_contents($full_f);

        // Get the MIME type of the file
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $full_f);
        finfo_close($finfo);

        // Create a blob from the file contents
        $blob = new \stdClass();
        $blob->content = base64_encode($fileContent);
        $blob->mime = $mimeType;
        $postdata->set('pdf_blob', json_encode($blob));

}

function show_pdf($value, $fieldname, $primary_key, $row, $xcrud)
{

   $blob = json_decode($value);

    // Embed a PDF viewer using HTML
    $html = '<embed src="data:' . $blob->mime . ';base64,' . $blob->content . '" type="' . $blob->mime . '" width="100%" height="600px" />';

    return $html;
}




