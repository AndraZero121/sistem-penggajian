import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import setBaseUrl from "../utils/service"

export default function Home() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const onChangeForm = (key, value) => {
    setForm({
      ...form, [key]: value
    })
  }
  async function onSubmit() {
    try {
      const requestdata = await setBaseUrl.post("/login", {
        email: form.email,
        password: form.password
      })
      if(requestdata.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Unexpected Response!",
          confirmButtonText: "OK",
        })
        return; // End
      }
      localStorage.setItem("token", String(requestdata.data.token).trim())
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Anda berhasil masuk ke akun Anda",
        confirmButtonText: "OK",
      })
      navigate("/dashboard")
    } catch(e) {
      const response = e.response
      if(response) {
        // Catch Error Axios (Axios Has Return Error If Status Respon On 4xx And 5xx)
        const catchError = Object.values((response.data.errors))?.flat()?.join(", ")
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: catchError,
          confirmButtonText: "OK",
        })
        return; // End
      }
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: "Masalah pada koneksi ke server",
        confirmButtonText: "OK",
      })
    }
  }
  async function DetectedNotLogin() {
    const isLoggedIn = () => {
      const token = localStorage.getItem("token")
      return token
    }
    if(isLoggedIn()) {
      return navigate("/dashboard")
    }
  }
  useEffect(() => {
    DetectedNotLogin()
  }, [])
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
              style={{ marginRight: "8px" }}
            />
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>Bank Jateng Syariah</span>
          </a>
          <button className="btn btn-primary ms-auto" type="button">
            Masuk
          </button>
        </div>
      </nav>
      <section>
        <div className="container text-center my-5">
          <img src="login.png" alt="Bank Jateng Syariah Banner" className="img-fluid" />
          <p className="fs-3 fw-bold mt-3">Masuk Ke Akun Anda</p>
        </div>
      </section>
      <section>
        <div className="container">
          <form method="post">
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
                  onChange={event => onChangeForm("email", event.target.value)}
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
                  onChange={event => onChangeForm("password", event.target.value)}
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
                Belum punya akun?{" "}
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

