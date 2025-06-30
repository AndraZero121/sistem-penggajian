import {useState, useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import useBaseUrl from '../utils/service'
import Swal from 'sweetalert2'

export default function Jabatan() {
    const [nama, setNama] = useState('')
    const [jabatan, setJabatan] = useState([])
    const [editId, setEditId] = useState(null)
    const [editNama, setEditNama] = useState('')
    const [showForm, setShowForm] = useState(false);

    // Fetch data departemen
    useEffect(() => {
        const fetchJabatan = async () => {
            try {
                const response = await useBaseUrl.get('/jabatan', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setJabatan(response.data.data || [])
            } catch (error) {
                console.error(error)
            }
        }
        fetchJabatan()
    }, [])

    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        return token
    }
    if (!isLoggedIn()) {
        return <Navigate to='/'/>
    }

    const onSubmit = async () => {
        try {
            const response = await useBaseUrl.post('/jabatan', {
                nama_jabatan: nama
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const status = response.status
            if (status === 201) {
                Swal.fire(
                    {icon: 'success', title: 'Berhasil', text: 'Jabatan berhasil ditambahkan', confirmButtonText: 'OK'}
                )
                setNama('')
                // Fetch data terbaru setelah tambah
                const res = await useBaseUrl.get('/jabatan', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setJabatan(res.data.data || [])
            } else {
                Swal.fire(
                    {icon: 'error', title: 'Gagal', text: 'Gagal menambahkan departemen, silakan coba lagi', confirmButtonText: 'OK'}
                )
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onDelete = async (id) => {
        try {
            const response = await useBaseUrl.delete(`/departemen/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                Swal.fire(
                    {icon: 'success', title: 'Berhasil', text: 'Jabatan berhasil dihapus', confirmButtonText: 'OK'}
                )
                setJabatan(jabatan.filter(item => item.id !== id))
            } else {
                Swal.fire(
                    {icon: 'error', title: 'Gagal', text: 'Gagal menghapus jabatan, silakan coba lagi', confirmButtonText: 'OK'}
                )
            }
        } catch (error) {
            console.error(error)
            Swal.fire(
                {icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan saat menghapus departemen', confirmButtonText: 'OK'}
            )
        }
    }

    // Tambahkan function edit
    const onEdit = (item) => {
        setEditId(item.id)
        setEditNama(item.nama_departemen)
    }

    const onUpdate = async () => {
        try {
            const response = await useBaseUrl.put(`/jabatan/${editId}`, {
                nama_jabatan: editNama
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                Swal.fire(
                    {icon: 'success', title: 'Berhasil', text: 'Jabatan berhasil diupdate', confirmButtonText: 'OK'}
                )
                setEditId(null)
                setEditNama('')
                // Fetch data terbaru setelah update
                const res = await useBaseUrl.get('/jabatan', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setJabatan(res.data.data || [])
            } else {
                Swal.fire(
                    {icon: 'error', title: 'Gagal', text: 'Gagal mengupdate jabatan, silakan coba lagi', confirmButtonText: 'OK'}
                )
            }
        } catch (error) {
            console.error(error)
            Swal.fire(
                {icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan saat mengupdate departemen', confirmButtonText: 'OK'}
            )
        }
    }

    const onCancelEdit = () => {
        setEditId(null)
        setEditNama('')
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
                    <h2>Jabatan</h2>
                    <button
                        type='button'
                        className="btn btn-primary btn-sm mb-3"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Tutup' : 'Tambah'}
                    </button>
                    {showForm && (
                        <div className="row mb-3">
                            <div className="col-md-5 d-flex">
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nama Jabatan"
                                        value={nama}
                                        onChange={event => setNama(event.target.value)}/>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm ms-2"
                                    onClick={async () => {
                                        await onSubmit();
                                        setShowForm(false);
                                    }}
                                >Simpan</button>
                            </div>
                        </div>
                    )}
                    <div className="table-responsive">
                        <table className="table table-striped-columns">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Jabatan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    jabatan.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {
                                                    editId === item.id
                                                        ? (
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editNama}
                                                                onChange={e => setEditNama(e.target.value)}
                                                                autoFocus="autoFocus"/>
                                                        )
                                                        : (item.nama_jabatan)
                                                }
                                            </td>
                                            <td>
                                                {
                                                    editId === item.id
                                                        ? (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm me-2"
                                                                    onClick={onUpdate}
                                                                >Simpan</button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary btn-sm"
                                                                    onClick={onCancelEdit}
                                                                >Batal</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning btn-sm me-2"
                                                                    onClick={() => onEdit(item)}
                                                                >Edit</button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => onDelete(item.id)}
                                                                >Hapus</button>
                                                            </>
                                                        )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
