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

                $table->unsignedBigInteger('livello')->nullable();
                $table->foreign('livello')->references('id')->on('levels')->onDelete('cascade');

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
            $table->dropForeign(['livello']);

            // Rimuovere il campo livello
            $table->dropColumn('livello');
        });
    }
};
