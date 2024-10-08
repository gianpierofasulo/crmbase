<?php 
echo $this->render_table_name($mode); 
?>
<div class="xcrud-top-actions btn-group">
   <?php 
 if($this->is_next_previous){
 	 echo "<div class='btn-group' role='group'>";
	 echo $this->render_previous('Previous','edit','','xcrud-button xcrud-green ui white button','','edit');
	 echo $this->details_counter();    
	 echo $this->render_next('Next','edit','','xcrud-button xcrud-green ui white button','','edit');
     echo "</div><br><br>";  
 }
 ?>
</div>
<div class="xcrud-top-actions btn-group">   
    <?php 
    echo $this->render_button('save_return','save','list','ui primary button','','create,edit');
    echo $this->render_button('save_new','save','create',' ui white button','','create,edit');
    echo $this->render_button('save_edit','save','edit','ui white button','','create,edit');
    echo $this->render_button('return','list','','ui orange button'); ?>
</div>
<form data-parsley-validate='' class="parsley-form ui form" id="fileupload" method="POST" enctype="multipart/form-data">
<div class="xcrud-view">
<?php echo $mode == 'view' ? $this->render_fields_list($mode,array('tag'=>'table','class'=>'table form ui')) : $this->render_fields_list($mode,'div','div','label','div'); ?>
</div>
</form>
<div class="xcrud-nav form-inline">
    <?php echo $this->render_benchmark(); ?>
</div>

<?php
if($this->parsley_active){	
	include("xcrud_parsley.php");
}
if($this->bulk_image_upload_active){
    include "bulk_image_upload.php";
}
?>


    