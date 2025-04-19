import { Code2 } from 'lucide-react'
import { Link } from 'react-router'
import { AuroraText } from './aurora-text'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <Link
        to="/"
        className="flex items-center justify-start btn btn-ghost text-xl"
      >
        <Code2 size={24} className="h-6 w-6 text-primary" />
        <AuroraText
          colors={['oklch(62% 0.194 149.214)']}
          className="text-2xl italic"
        >
          Chadllenger
        </AuroraText>
      </Link>
    </nav>
  )
}

export default Navbar
