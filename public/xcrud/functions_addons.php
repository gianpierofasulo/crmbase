<?php


function letterColors(){
    $letterColors = array(
        'A' => '#FF7F50', // Coral
        'B' => '#FFA500', // Orange
        'C' => '#FF7F50', // Coral
        'D' => '#FFA500', // Orange
        'E' => '#32CD32', // Lime Green
        'F' => '#32CD32', // Lime Green
        'G' => '#32CD32', // Lime Green
        'H' => '#FF7F50', // Coral
        'I' => '#FFA500', // Orange
        'J' => '#FF7F50', // Coral
        'K' => '#FFA500', // Orange
        'L' => '#32CD32', // Lime Green
        'M' => '#FF7F50', // Coral
        'N' => '#FFA500', // Orange
        'O' => '#32CD32', // Lime Green
        'P' => '#669966', // Pastel Green
        'Q' => '#FF7F50', // Coral
        'R' => '#FFA500', // Orange
        'S' => '#32CD32', // Lime Green
        'T' => '#32CD32', // Lime Green
        'U' => '#FF7F50', // Coral
        'V' => '#FFA500', // Orange
        'W' => '#32CD32', // Lime Green
        'X' => '#FF7F50', // Coral
        'Y' => '#FFA500', // Orange
        'Z' => '#32CD32', // Lime Green
        '0' => '#FF7F50', // Coral
        '1' => '#FFA500', // Orange
        '2' => '#FF7F50', // Coral
        '3' => '#FFA500', // Orange
        '4' => '#32CD32', // Lime Green
        '5' => '#32CD32', // Lime Green
        '6' => '#32CD32', // Lime Green
        '7' => '#FF7F50', // Coral
        '8' => '#FFA500', // Orange
        '9' => '#32CD32', // Lime Green
    );
    return $letterColors;
}

function format_phone($new_phone)
{
    $new_phone = preg_replace("/[^0-9]/", "", $new_phone);

    if (strlen($new_phone) == 7)
        return preg_replace("/([0-9]{3})([0-9]{4})/", "$1-$2", $new_phone);
    elseif (strlen($new_phone) == 10)
        return preg_replace("/([0-9]{3})([0-9]{3})([0-9]{4})/", "($1) $2-$3", $new_phone);
    else
        return $new_phone;
}



function formatCurrency($amount, $currencySymbol = '$', $decimalPlaces = 2) {
    return $currencySymbol . number_format($amount, $decimalPlaces);
}

function generateRandomPassword($length = 8) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $password;
}


function generateCircleAvatar($fullName) {
    // Extract the first letter of the first name
   $firstLetter = strtoupper(substr($fullName, 0, 1));

   $letterColors = letterColors();

    // Extract the first letter of the first name
    $firstLetter = strtoupper(substr($fullName, 0, 1));

    // Get the color for the letter from the mapping
    $color = isset($letterColors[$firstLetter]) ? $letterColors[$firstLetter] : '#000'; // Default color if letter not found


    // Generate HTML string with circle avatar
    $html = '<div style="width: 35px; height: 35px; background-color: ' . $color . '; border-radius: 50%; color: #fff; text-align: center; line-height: 35px; font-size: 16px;">';
    $html .= '<i class="fa fa-user" style="font-size: 20px;"></i>'; // Font Awesome icon
    $html .= '</div>';

    return $html;
}

function getStatusSwitchRadio($value, $fieldname, $primary, $row, $xcrud) {
    //echo $value;
    $primary_key_tmp = 0;
    if($primary == "edit"){
        $primary_key_tmp =  $row['primary_key'];
    }else{
        $primary_key_tmp = $primary;
    }

    if($primary_key_tmp == 1){

    }else{
         if ($value == "Yes" || $value == "1") {
            return '<label class="switch">
                      <input type="checkbox" checked class="xcrud-action" title="Activate/Deactivate" data-task="action" data-action="deactivate_user" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        } else {
            return '<label class="switch">
                      <input type="checkbox" class="xcrud-action" title="Activate/Deactivate" data-task="action" data-action="activate_user" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        }
    }
   
}

function getStatusSwitchRadio_Edit($value, $fieldname, $primary, $row, $xcrud) {
    
    $primary_key_tmp = 0;
    if($primary == "edit"){
        $primary_key_tmp =  $row['primary_key'];
    }else{
        $primary_key_tmp = $primary;
    }

    if($primary_key_tmp == 1){

    }else{
         if ($value == "Yes" || $value == "1") {
            return '<label class="switch">
                      <input type="checkbox" checked class="xcrud-action" title="Activate/Deactivate" data-after="edit" data-task="action" data-action="deactivate_user" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        } else {
            return '<label class="switch">
                      <input type="checkbox" class="xcrud-action" title="Activate/Deactivate"  data-after="edit" data-task="action" data-action="activate_user" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        }
    }
   
}

function getStatusSwitchRadio_Gallery($value, $fieldname, $primary, $row, $xcrud) {
    //echo $value;
    $primary_key_tmp = 0;
    if($primary == "edit"){
        $primary_key_tmp =  $row['primary_key'];
    }else{
        $primary_key_tmp = $primary;
    }

    if($primary_key_tmp == 1){

    }else{
         if ($value == "Yes" || $value == "1") {
            return '<label class="switch">
                      <input type="checkbox" checked class="xcrud-action" title="Activate/Deactivate" data-task="action" data-action="deactivate_gallery" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        } else {
            return '<label class="switch">
                      <input type="checkbox" class="xcrud-action" title="Activate/Deactivate" data-task="action" data-action="activate_gallery" data-primary="' . $primary_key_tmp . '">
                      <span class="slider round"></span>
                    </label>';
        }
    }
   
}

function activate_gallery($xcrud){

    if ($xcrud->get('primary') !== false)
    {
        $primary = (int)$xcrud->get('primary');
        $db = Xcrud_db::get_instance();

        //
        $query = "UPDATE `gallery` SET active ='1' WHERE id = $primary";
        $db->query($query);

    }
}

function deactivate_gallery($xcrud){

    if ($xcrud->get('primary') !== false)
    {
       $primary = (int)$xcrud->get('primary');
        $db = Xcrud_db::get_instance();

        //
        $query = "UPDATE `gallery` SET active ='0' WHERE id = $primary";
        $db->query($query);
    }
}

function getAvatar($param) {

    
    $letterColors = letterColors();

    // Extract the first letter of the email string
    $firstLetter = strtoupper(substr($param, 0, 1));

    // Get the color for the letter from the mapping
    $color = isset($letterColors[$firstLetter]) ? $letterColors[$firstLetter] : '#000'; // Default color if letter not found

    // Generate a random color for the circle (hexadecimal format)
    //$color = sprintf('#%06X', mt_rand(0, 0xFFFFFF));

    // Construct the HTML output
    $output = '<div style="float: left;margin: 5px;display: inline-block; border-radius: 50%; width: 30px; height: 30px; background-color: ' . $color . '; text-align: center; line-height: 30px; color: white; font-weight: bold;">' . $firstLetter . '</div>';
    $output .= '<span style="margin-left: 5px;">' . $param . '</span>';

    // Return the HTML output
    return $output;
}

function getDashboardValue($param) {

    $letterColors = letterColors();

    // Extract the first letter of the email string
    $firstLetter = strtoupper(substr($param, 0, 1));

    // Get the color for the letter from the mapping
    $color = isset($letterColors[$firstLetter]) ? $letterColors[$firstLetter] : '#000'; // Default color if letter not found

    // Generate a random color for the circle (hexadecimal format)
    //$color = sprintf('#%06X', mt_rand(0, 0xFFFFFF));

    // Construct the HTML output
    $output = '<div class="dashboard-counter" style="background-color: ' . $color . ';">' . $firstLetter . '</div>';
    // .= '<span style="margin-left: 5px;">' . $param . '</span>';

    // Return the HTML output
    return $output;
}

function getStatusLabel($status) {
    $letterColors = letterColors();
    
    $firstLetter = strtoupper(substr($status, 0, 1));
    $color = isset($letterColors[$firstLetter]) ? $letterColors[$firstLetter] : '#FFFFFF'; // Default color
    
    return '<span class="label" style="background-color: ' . $color . '">' . $status . '</span>';
}

function timeAgo($timestamp) {

    // Convert the timestamp to a Unix timestamp
    $time = strtotime($timestamp);

    // Calculate the time difference in seconds
    $diff = time() - $time;

    // Define time intervals in seconds
    $intervals = array(
        31536000 => "year",
        2592000 => "month",
        604800 => "week",
        86400 => "day",
        3600 => "hour",
        60 => "minute",
        1 => "second"
    );

    // Initialize the output string
    $output = "";

    // Loop through the intervals
    foreach ($intervals as $secs => $desc) {
        // Calculate the number of occurrences for the current interval
        $count = intval($diff / $secs);

        // If there are occurrences, add to the output string
        if ($count > 0) {
            // Add plural form if count is greater than 1
            $output .= $count . " " . $desc . ($count > 1 ? "s" : "") . " ago";

            // Only display one time interval, then break out of the loop
            break;
        }
    }

    // Return the formatted string
    return $output;
}

?>
