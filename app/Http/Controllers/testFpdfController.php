<?php

namespace App\Http\Controllers;
use App\Libraries\FpdfWrapper;
use Illuminate\Http\Request;

class testFpdfController extends Controller
{
    //
    public function generatePdf()
    {
        $pdf = new FpdfWrapper();
        $pdf->AddPage();
        $pdf->SetFont('Arial', 'B', 16);
        $pdf->Cell(40, 10, 'Hello World!');
        $pdf->Output();
        exit;
    }
}
