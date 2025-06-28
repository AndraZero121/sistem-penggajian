import { useState } from 'react'
// import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, Navigate } from 'react-router-dom'
import setBaseUrl from '../utils/service'

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onChangeForm = (key, value) => {
    setForm({
      ...form, [key]: value
    })
  }

  const onSubmit = async () => {
    try {
      const response = await setBaseUrl.post('/login', {
        email: form.email,
        password: form.password,
      })
      const status = response.status
      if (status === 200) {
        // Simpan token ke localStorage
        localStorage.setItem('token', response.data.token)
        // Redirect ke halaman dashboard
        navigate('/dashboard')
        // Tampilkan pesan sukses
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Anda berhasil masuk ke akun Anda',
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      let message = 'Gagal masuk ke akun Anda, silakan coba lagi'
      if (error.response && error.response.status === 422) {
        // Laravel validation error
        const errors = error.response.data.errors
        message = Object.values(errors).flat().join(', ')
      }
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: message,
        confirmButtonText: 'OK',
      })
    }
  }
  const isLoggedIn = () => {
    const token = localStorage.getItem('token')
      return token
    }
    // Redirect to dashboard if already logged in
    if (isLoggedIn()) {
        return <Navigate to='/dashboard' />
    }

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="bank_jateng.png"
              alt="Logo"
              width="60"
              height="40"
              className="d-inline-block align-text-top"
              style={{ marginRight: '8px' }}
            />
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Bank Jateng Syariah</span>
          </a>
          <button className="btn btn-primary ms-auto" type="button">
            Masuk
          </button>
        </div>
      </nav>
      <section>
        <div className="container text-center my-5">
          <img src="login.png" alt="Bank Jateng Syariah Banner" className="img-fluid" />
          <p className='fs-3 fw-bold mt-3'>Masuk Ke Akun Anda</p>
        </div>
      </section>
      <section>
        <div className="container">
          <form method='post'>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="nama_pengguna" className="form-label fw-bold">
                  Masukkan Nama Pengguna / Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Masukkan Nama Pengguna / Email"
                  onChange={event => onChangeForm('email', event.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="password" className="form-label fw-bold">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Kata Sandi"
                  onChange={event => onChangeForm('password', event.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <button type="button" className="btn btn-primary w-100" onClick={onSubmit}>
                  Masuk
                </button>
              </div>
            </div>
              <p className="text-muted text-center">
                Belum punya akun?{' '}
                <a href="/register" className="text-decoration-none">
                 Daftar
                </a>
              </p>
          </form>
        </div>
      </section>
    </div>
  )
}

