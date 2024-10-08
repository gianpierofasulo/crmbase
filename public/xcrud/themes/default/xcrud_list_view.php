<?php echo $this->render_table_name(); ?>
<?php if ($this->is_create or $this->is_csv or $this->is_print){?>
        
        <?php } ?>

      <?php 
      if($this->advanced_search_position == "top"){
        echo $this->render_advanced_filter(); 
      } 
      ?>
        
        <div class="row">

        <?php   
        if($this->advanced_search_position == "left"){
            echo "<div class='col-sm-3 four wide column' style='width: 30%;float: left;'>";
            echo $this->render_advanced_filter();
            echo "</div>"; 
        } 

        ?>

<?php echo $this->add_button('xcrud-button xcrud-green','icon-plus'); ?>
            <?php echo $this->csv_button('xcrud-button xcrud-purple','icon-file'); ?>
            <?php echo $this->print_button('xcrud-button xcrud-pink','icon-print'); ?>
            <?php echo $this->render_benchmark(); ?>
            <?php echo $this->render_limitlist(true); ?>
            <?php echo $this->render_pagination(); ?>
            <?php 
               
		        if(!$this->tabulator_active){
                     echo $this->render_search(); 
            }else{
              echo $this->render_search_tabulator(); 
            }
            ?>
            <br>
            

        <div class="xcrud-list-container" <?php if($this ->is_edit_side){ echo 'style="width: 100%;float: left;position: relative;"'; } if($this->advanced_search_position == "left" && $this->advanced_search_opened == true){ echo 'style="width: 70%;float: left;position: relative;"'; }else{ echo 'style="width: 99%;float: left;position: relative;"'; }?> >
        	
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
        if($this->tabulator_active){
        	include("xcrud_tabulator.php");
        }
		
		}
        ?> 

        </div>

        <?php
        if($this ->is_edit_side){
        	?>
        <div class="edit_side_panel" >
        	
        </div>
        <?php
        }
        ?>	

        </div>
      
       

         
        <div class="xcrud-nav form-inline">
            
        <?php      
        if($this->tabulator_active){
        ?>
                  
			  <select class="download-select" style='min-width: 100px;'>
			  	<option value='print-table'>Print Table</option>
			    <option value='download-csv'>Download CSV</option>
			    <option value='download-json'>Download JSON</option>
			    <option value='download-xlsx'>Download XLSX</option>
			    <option value='download-pdf'>Download PDF</option>
			    <option value='download-html'>Download HTML</option>			  	
			  </select>
			   <!-- <i class="fa fa-print"></i> Print/Download  -->
			  
			

       <?php      
        }
        ?>      
                    
                <?php 
                
                if ($this->advanced_search_active == true){
                ?>
                
                <a class="xcrud-advanced-search-toggle col-auto ui white button" href="javascript:;">
                <i class="fa fa-search"></i>
                    Advanced Search
                </a>

                <?php 
                }
                ?>
            
            
            ?>

            <div class="clearfix"></div>
        </div>
        
       <script>
       	
         document.addEventListener("DOMContentLoaded", function() { 
            $('.download-select').change(function (e) {           
                var strUser = $(this). children("option:selected"). val();
              //alert(strUser);
              switch(strUser) {
            case 'print-table':
              table.print(false, true);
              break;
            case 'download-csv':
              table.download("csv", "data.csv");
              break;
            case 'download-json':
              table.download("json", "data.json");
              break; 
            case 'download-xlsx':
            table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
              break; 
            case 'download-pdf':
            table.download("pdf", "data.pdf", {
                    orientation:"portrait", //set page orientation to portrait
                    title:"Example Report", //add title to report
                });
              break;      
            default:
              // code block
          }
            
        });

         });
       	
       </script>
