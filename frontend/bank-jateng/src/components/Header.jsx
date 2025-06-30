import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
const itemsLink = {
  list: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Karyawan", to: "/karyawan" },
    { label: "Laporan", to: "/laporan" },
  ],
  profile: "/",
  icon: "/"
}

export default function Header() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const getToken = localStorage.getItem("token")
    setIsLogin(!!getToken && typeof getToken === "string")
  }, [])
  return <>
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to={itemsLink.icon}>
            <img
              src="bank_jateng.png"
              alt="Logo"
              width="60"
              height="40"
              className="d-inline-block align-text-top"
              style={{ marginRight: "8px" }}
            />
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>Bank Jateng Syariah</span>
          </Link>
          {isLogin? <>
            {itemsLink.list.map((items, i) => (
              <Link className={"nav-link active "+(i !== 0?"ms-3":"ms-auto")} aria-current="page" to={items.to}>
                <span>{items.label}</span>
              </Link>
            ))}
            <Link to={itemsLink.profile} style={{ marginLeft: "0.5rem" }}>
              <img src="default_user.png" alt="Default User" width={40} height={40}/>
            </Link>
          </>:<>
            <button className="btn btn-primary ms-auto" type="button">
              <span>Masuk</span>
            </button>
          </>}
        </div>
      </nav>
    </header>
    <Outlet />
  </>
}
