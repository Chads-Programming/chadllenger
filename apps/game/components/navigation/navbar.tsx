import { AuroraText } from 'components/ui/aurora-text'
import { Code2 } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="navbar backdrop-blur-sm bg-gradient-to-r from-primary/5 to-secondary/10 border-0 border-b border-base-300 shadow-sm">
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
