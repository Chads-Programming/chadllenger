import { Code2 } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Chadllenger</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
