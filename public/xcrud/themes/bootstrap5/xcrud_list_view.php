<?php echo $this->render_table_name(); ?>
<?php if ($this->is_create or $this->is_csv or $this->is_print){?>
        
        <div class="xcrud-top-actions">
        <?php      
        if($this->tabulator_active){
        ?>      
            <div class="dropdown pull-right">
			  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    <i class="fa fa-print"></i> Print/Download 
			  </button>
			  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
			  	<a class="dropdown-item" href="javascript:void(0);" id="print-table">Print Table</a>
			    <a class="dropdown-item" href="javascript:void(0);" id="download-csv">Download CSV</a>
			    <a class="dropdown-item" href="javascript:void(0);" id="download-json">Download JSON</a>
			    <a class="dropdown-item" href="javascript:void(0);" id="download-xlsx">Download XLSX</a>
			    <a class="dropdown-item" href="javascript:void(0);" id="download-pdf">Download PDF</a>
			    <a class="dropdown-item" href="javascript:void(0);" id="download-html">Download HTML</a>
			  </div>
			</div>
        <?php      
        }else{
        ?>                
            <div class="btn-group pull-right">
                <?php 
                
                if ($this->advanced_search_active == true){
                ?>
                
                <a class="xcrud-advanced-search-toggle col-auto btn btn-light" href="javascript:;">
                <i class="fa fa-search"></i>
                    Advanced Search
                </a>

                <?php 
                }
                ?>

                <?php 
                
                echo $this->refresh_button('btn btn-light','fa fa-refresh');
                echo $this->print_button('btn btn-light','fa fa-print');
                echo $this->csv_button('btn btn-light','fa fa-file'); 
                
                ?>
            </div>            
        <?php      
        }
        ?>
           
        <?php echo $this->add_button('btn btn-success','fa fa-plus'); ?>
        
        <div class="clearfix"></div>
        </div>
        <?php } ?>
      
        
      <?php 
      if($this->advanced_search_position == "top"){
        echo $this->render_advanced_filter(); 
      } 
      ?>

      <div class="row" style="margin: 0!important;overflow-x: scroll;">

        <?php   
        if($this->advanced_search_position == "left"){
            echo "<div class='col-sm-3'>";
            echo $this->render_advanced_filter();
            echo "</div>"; 
        } 

        
        ?>

        <?php
            //echo "TTTT" . $this->advanced_search_opened ;
        ?>
      
        <div class="xcrud-list-container <?php if($this ->is_edit_side){ echo 'col-sm-12'; } if($this->advanced_search_position == "left" && $this->advanced_search_opened == true){ echo 'col-sm-9'; } ?>">
        	
        <?php      
        if(!$this->tabulator_active){
        ?>
         <?php      
                if($this->panel_view){
            ?>   	
                <table class="xcrud-list table table-striped table-hover table-bordered">
                    <thead>
                        <?php echo $this->render_grid_head('div', 'span'); ?>
                    </thead>
                    <tbody>
                        <?php echo $this->render_grid_body_panels('div', 'span'); ?>
                    </tbody>
                    <tfoot>
                        <?php echo $this->render_grid_footer('div', 'span'); ?>
                    </tfoot>
                </table>
             <?php      
                }else{
             ?>
              <table class="xcrud-list table table-striped table-hover table-bordered">
                    <thead>
                        <?php echo $this->render_grid_head('tr', 'th'); ?>
                    </thead>
                    <tbody>
                        <?php echo $this->render_grid_body('tr', 'td'); ?>
                    </tbody>
                    <tfoot>
                        <?php echo $this->render_grid_footer('tr', 'td'); ?>
                    </tfoot>
                </table>
             <?php      
                }
             ?>

        <?php      
        }else{
        ?>
 
         <table class="xcrud-list-2 table table-striped table-hover table-bordered">
            <thead>
                <?php 
                //echo $this->render_grid_head('tr', 'th'); 
                ?>
            </thead>
         </table>   
         <table class="xcrud-list table table-striped table-hover table-bordered" style="width:100%;">
         
        </table>

        <?php  
        }
        ?>
        
        </div>

    
       
        <!-- Side Edit Mode -->
        <?php
        if($this ->is_edit_side){
        ?>
        <div class="col-sm-5 edit_side_panel">
        	
        </div>
        <?php
        }
        ?>	  
        
        <div class="xcrud-nav form-inline btn-group">
            
            <?php echo $this->render_limitlist(true); ?>
            <?php echo $this->render_pagination(); ?>
            <?php            
		        if(!$this->tabulator_active){
                     echo $this->render_search(); 
				}else{
					 echo $this->render_search_tabulator(); 
				}         
            ?>
            <?php echo $this->render_benchmark(); ?>         
        </div>  
        
        <?php
        if($this->tabulator_active){
        	include("xcrud_tabulator.php");
        }
        ?>  
        </div>  
        
      <?php 
      if($this->advanced_search_position == "bottom"){
        echo $this->render_advanced_filter(); 
      } 
      ?>
        
    

