import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import getBaseUrl from '../utils/service'
import Swal from 'sweetalert2'

export default function Karyawan() {
  const [dataJabatan, setDataJabatan] = useState([])
  const [dataDepartemen, setDataDepartemen] = useState([])
  const [dataKaryawan, setDataKaryawan] = useState([])
  const [form, setForm] = useState({
    id_jabatan: "",
    id_departemen: "",
    nama_lengkap: "",
    nik_ktp: "",
    npwp: "",
    status_ptkp: "",
    tanggal_bergabung: "",
    gaji_pokok: "",
    nomor_rekening: "",
    nama_bank: "",
    status_kepegawaian: "",
    is_active: "",
  })

  useEffect(() => {
    fetchJabatanDepartemen()
    onFetch()
  }, [])

  const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    return token
  }
  if (!isLoggedIn()) {
    return <Navigate to='/' />
  }

  const fetchJabatanDepartemen = async () => {
    const responseJabatan = await getBaseUrl.get("/jabatan", {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    const responseDepartemen = await getBaseUrl.get("/departemen", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    const [jabatan, departemen] = await Promise.all([responseJabatan, responseDepartemen])

    setDataDepartemen(departemen.data.data)
    setDataJabatan(jabatan.data.data)
  }

  const onFetch = async () => {
    const response = await getBaseUrl.get("/karyawan", {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })

    setDataKaryawan(response.data.data)
  }

  const onChangeForm = (key, value) => {
    setForm({ ...form, [key]: value})
  }

  const onSubmit = async () => {
    // console.log(form)
    try {
    const response = await getBaseUrl.post("/karyawan", form, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    Swal.fire('Sukses', 'Data karyawan berhasil disimpan', 'success')
    console.log(response.data)
    } catch (error) {
console.log(error.message)
    }
  }

  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow-sm">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="#">
      <img
        src="bank_jateng.png"
        alt="Logo"
        width="60"
        height="40"
        className="d-inline-block align-text-top"
        style={{ marginRight: '8px' }}
      />
      <span style={{ marginLeft: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Bank Jateng Syariah
      </span>
      </Link>
      <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto align-items-center">
        <li className="nav-item">
        <Link to="/dashboard" className="nav-link active" aria-current="page">
          Dashboard
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/karyawan" className="nav-link">
          Karyawan
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/departemen" className="nav-link">
          Departemen
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/jabatan" className="nav-link">
          Jabatan
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/laporan" className="nav-link">
          Laporan
        </Link>
        </li>
        <li className="nav-item ms-3">
        <img
          src="default_user.png"
          alt="Default User"
          style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid #ddd',
          objectFit: 'cover'
          }}
        />
        </li>
      </ul>
      </div>
    </div>
    </nav>

    <section className='py-5'>
    <div className="container">
      <h2>Karyawan</h2>
      <Link to="/departemen" className="btn btn-sm btn-primary">Departemen</Link>
      <Link to="/jabatan" className="btn btn-sm btn-primary ms-2">Jabatan</Link>
      <p>Selamat Datang, {localStorage.getItem('name') || 'User'}</p>

      <div className="card mt-3">
      <div className="card-header">Form Karyawan</div>
      <div className="card-body">
        <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Jabatan</label>
          <select className='form-select' id="id_jabatan" value={form.id_jabatan} onChange={event => onChangeForm("id_jabatan", event.target.value)}>
          <option value="">Pilih Jabatan</option>
          {dataJabatan.map((item, idx) => (
            <option key={idx} value={item.id || ''}>{item.nama_jabatan || ''}</option>
          ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Departemen</label>
          <select className='form-select' id="id_departemen" value={form.id_departemen} onChange={event => onChangeForm("id_departemen", event.target.value)}>
          <option value="">Pilih Departemen</option>
          {dataDepartemen.map((item, idx) => (
            <option key={idx} value={item.id || ''}>{item.nama_departemen || ''}</option>
          ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Nama Lengkap</label>
          <input type="text" className='form-control' placeholder='Masukkan Nama Lengkap Anda...' onChange={event => onChangeForm("nama_lengkap", event.target.value)} value={form.nama_lengkap}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">NIK KTP</label>
          <input type="number" className='form-control' placeholder='Masukkan NIK KTP Anda...' onChange={event => onChangeForm("nik_ktp", event.target.value)} value={form.nik_ktp}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">NPWP</label>
          <input type="number" className='form-control' placeholder='Masukkan NPWP Anda...' onChange={event => onChangeForm("npwp", event.target.value)} value={form.npwp}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Status PTKP</label>
          <input type="text" className='form-control' placeholder='Masukkan Status PTKP Anda...' onChange={event => onChangeForm("status_ptkp", event.target.value)} value={form.status_ptkp}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Tanggal Bergabung</label>
          <input type="date" className='form-control' onChange={event => onChangeForm("tanggal_bergabung", event.target.value)} value={form.tanggal_bergabung}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Gaji Pokok</label>
          <input type="number" className='form-control' placeholder='Masukkan Gaji Pokok Anda...' onChange={event => onChangeForm("gaji_pokok", event.target.value)} value={form.gaji_pokok}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Nomor Rekening</label>
          <input type="text" className='form-control' placeholder='Masukkan Nomor Rekening Anda...' onChange={event => onChangeForm("nomor_rekening", event.target.value)} value={form.nomor_rekening}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Nama Bank</label>
          <input type="text" className='form-control' placeholder='Masukkan Nama Bank Anda...' onChange={event => onChangeForm("nama_bank", event.target.value)} value={form.nama_bank}/>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Status Kepegawaian</label>
          <select className='form-select' value={form.status_kepegawaian} onChange={event => onChangeForm("status_kepegawaian", event.target.value)}>
          <option value="">Pilih Status Kepegawaian</option>
          <option value="Tetap">Tetap</option>
          <option value="Kontrak">Kontrak</option>
          <option value="Harian">Harian</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Status Karyawan</label>
          <select className='form-select' value={form.status_karyawan} onChange={event => onChangeForm("is_active", event.target.value)}>
          <option value="">Pilih Status Karyawan</option>
          <option value="1">Aktif</option>
          <option value="0">Tidak Aktif</option>
          </select>
        </div>
        </div>
        <button type='button' className='btn btn-primary' onClick={onSubmit}>Submit</button>
      </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Departemen</th>
              <th>NIK/KTP</th>
              <th>NPWP</th>
              <th>Status PTKP</th>
              <th>Tanggal Bergabung</th>
              <th>Gaji Pokok</th>
              <th>Nomor Rekening</th>
              <th>Nama Bank</th>
              <th>Status Kepegawaian</th>
              <th>Status Karyawan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKaryawan.map((item,idx) => {
              return (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item.nama_lengkap}</td>
                  <td>{item.jabatan.nama_jabatan}</td>
                  <td>{item.departemen.nama_departemen}</td>
                  <td>{item.nik_ktp}</td>
                  <td>{item.npwp}</td>
                  <td>{item.status_ptkp}</td>
                  <td>{item.tanggal_bergabung}</td>
                  <td>{item.gaji_pokok}</td>
                  <td>{item.nomor_rekening}</td>
                  <td>{item.nama_bank}</td>
                  <td>{item.status_kepegawaian}</td>
                  <td>{item.is_active}</td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  </div>
  )
}
