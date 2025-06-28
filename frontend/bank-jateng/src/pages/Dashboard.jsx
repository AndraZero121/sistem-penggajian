import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  async function DetectedNotLogin() {
    const isLoggedIn = () => {
      const token = localStorage.getItem("token")
      return token
    }
    if (!isLoggedIn()) {
      return navigate("/")
    }
  }
  useEffect(() => {
    DetectedNotLogin()
  }, [])
  return <div>
    <section className="py-5">
      <div className="container">
        <h2>Dashboard</h2>
      </div>
    </section>
  </div>
}
