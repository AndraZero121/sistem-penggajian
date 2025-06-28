import { Link } from "react-router-dom"

export default function Karyawan() {
  return <div>
    <section className="py-5">
      <div className="container">
        <h2>Karyawan</h2>
        <Link to="/departemen" className="btn btn-sm btn-primary">Tambah Departemen</Link>
      </div>
    </section>
  </div>
}
