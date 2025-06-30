import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import getBaseUrl from '../utils/service'

export default function Laporan() {

    useEffect(() => {
        onFetch()
    }, [])

    const [dataLaporan, setDataLaporan] = useState([])
    const [dataKaryawan, setDataKaryawan] = useState([])
    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        return token
    }
    if (!isLoggedIn()) {
        return <Navigate to='/'/>
    }

    const onFetch = async () => {
        const response = await getBaseUrl.get("/slip-gaji", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDataLaporan(response.data.data)
        // console.log(response.data.data)
    }
    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow-sm">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="#">
                        <img
                            src="bank_jateng.png"
                            alt="Logo"
                            width="60"
                            height="40"
                            className="d-inline-block align-text-top"
                            style={{
                                marginRight: '8px'
                            }}/>
                        <span
                            style={{
                                marginLeft: '8px',
                                fontWeight: 'bold',
                                fontSize: '1.2rem'
                            }}>
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
                        aria-label="Toggle navigation">
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
                                    }}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className='py-5'>
                <div className="container">
                    <h2>Laporan</h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                              <tr>
                                <td>No</td>
                                <td>Nama Karyawan</td>
                                <td>Gaji Pokok</td>
                                <td>PPH21</td>
                                <td>Penghasilan Bersih</td>
                                <td>Aksi</td>
                              </tr>
                            </thead>
                            <tbody>
                              {dataLaporan.map((item,idx) => (
                                <tr key={idx}>
                                  <th>{idx + 1}</th>
                                  <td>{item.karyawan.nama_lengkap}</td>
                                  <td>{item.gaji_pokok}</td>
                                  <td>{item.pph21_terpotong}</td>
                                  <td>{item.thp}</td>
                                  <td>...</td>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
