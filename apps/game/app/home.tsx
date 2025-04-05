import { Brain, Code2, Rocket, Users } from 'lucide-react'
import type { Route } from './+types/home'
import { Link } from 'react-router'

const description = `Join collaborative coding rooms to solve challenges in real-time with
          developers around the world. Practice, learn, and improve your coding
          skills together`

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Chadllenger' },
    { name: 'description', content: description },
  ]
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Chadllenger</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        <Link
          to="/challenge"
          className="inline-flex items-center px-6 py-3 mt-8 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Rocket className="h-5 w-5 mr-2" />
          Get Started
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Collaborative Learning
          </h3>
          <p className="text-gray-600">
            Join rooms with other developers to solve coding challenges together
            and learn from each other.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Code2 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Real-time Coding
          </h3>
          <p className="text-gray-600">
            Write and test code in real-time with a powerful built-in code
            editor and instant feedback.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Practice Challenges
          </h3>
          <p className="text-gray-600">
            Improve your skills with various coding challenges ranging from
            algorithms to real-world problems.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Coding?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of developers and start solving challenges
          together. Create or join a room and begin your collaborative coding
          journey today.
        </p>
        <Link
          to="/challenge"
          className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Browse Rooms
        </Link>
      </div>
    </div>
  )
}
