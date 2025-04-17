import { Code2 } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <Link
        to="/"
        className="flex items-center justify-start btn btn-ghost text-xl"
      >
        <Code2 size={24} className="h-6 w-6 text-indigo-600" />
        Chadllenger
      </Link>
    </nav>
  )
}

export default Navbar
