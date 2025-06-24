<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departemen extends Model
{
    protected $table = 'departemens';
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the Karyawan associated with the Departemen.
     */
    public function karyawan()
    {
        return $this->hasMany(Karyawan::class, 'departemen_id');
    }
    /**
     * Get the Jabatan associated with the Departemen.
     */
    public function jabatan()
    {
        return $this->hasMany(Jabatan::class, 'departemen_id');
    }
}
