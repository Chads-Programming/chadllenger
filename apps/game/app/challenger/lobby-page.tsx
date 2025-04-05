import { Plus, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function meta() {
  return [
    { title: 'Selection game' },
    { name: 'description', content: 'Select a mode' },
  ]
}

interface Room {
  id: string
  name: string
  created_at: string
  player_count: number
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'JavaScript Algorithms',
    created_at: new Date().toISOString(),
    player_count: 3,
  },
  {
    id: '2',
    name: 'React Challenges',
    created_at: new Date().toISOString(),
    player_count: 2,
  },
]

export default function GameSelection() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [newRoomName, setNewRoomName] = useState('')
  const navigate = useNavigate()

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoomName.trim()) return

    const newRoom: Room = {
      id: Math.random().toString(),
      name: newRoomName,
      created_at: new Date().toISOString(),
      player_count: 1,
    }

    setRooms([newRoom, ...rooms])
    navigate(`/room/${newRoom.id}`)
    setNewRoomName('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Room</h2>
        <form onSubmit={createRoom} className="flex gap-4">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter room name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Room
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Rooms</h2>
        <div className="grid gap-4">
          {rooms.map((room) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={room.id}
              onClick={() => navigate(`/challenge/${room.id}`)}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(room.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="h-5 w-5 mr-2" />
                <span>{room.player_count}</span>
              </div>
            </div>
          ))}
          {rooms.length === 0 && (
            <p className="text-center text-gray-500 py-4">No active rooms</p>
          )}
        </div>
      </div>
    </div>
  )
}
