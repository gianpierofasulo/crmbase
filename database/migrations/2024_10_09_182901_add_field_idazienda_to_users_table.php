<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('azienda')->nullable();
            $table->foreign('azienda')->references('id')->on('aziende')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
            // Rimuovere la chiave esterna
            $table->dropForeign(['azienda']);

            // Rimuovere il campo livello
            $table->dropColumn('azienda');
        });
    }
};
