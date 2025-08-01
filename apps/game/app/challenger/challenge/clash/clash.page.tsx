import { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { Play } from 'lucide-react'
import { useClash } from './use-clash'
import ChallengeParticipants from '../../common/components/challenge-participants'
import type { Route } from './+types/clash.page'

export function meta() {
  return [
    { title: 'Game page' },
    { name: 'description', content: 'Welcome to the game!' },
  ]
}

const mockChallenge = {
  title: 'Sum Two Numbers',
  description:
    'Write a function that takes two numbers as parameters and returns their sum.',
  initial_code: 'function sum(a, b) {\n  // Write your code here\n}',
  test_cases: 'sum(1, 2) => 3\nsum(-1, 1) => 0\nsum(0, 0) => 0',
}

const mockPlayers = ['player1', 'player2', 'player3']

export default function ClashChallenge({
  params: { codename },
}: Route.ComponentProps) {
  const { challengeState } = useClash(codename)

  const [code, setCode] = useState(mockChallenge.initial_code)
  const [output, setOutput] = useState('')
  const [players] = useState(mockPlayers)

  const runCode = () => {
    try {
      // In a real app, you'd want to safely evaluate the code and run test cases
      // biome-ignore lint/security/noGlobalEval: <explanation>
      const result = eval(code)
      setOutput(String(result))
    } catch (error) {
      setOutput(String(error))
    }
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-xl font-bold text-gray-900">
                Room {codename}
              </h2>
            </div>
            <div className="p-4">
              <Editor
                height="500px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
            <div className="border-t border-gray-200 p-4">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={runCode}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-900">Output</h3>
            </div>
            <div className="p-4">
              <pre className="bg-gray-50 rounded p-4 font-mono text-sm">
                {output || 'No output yet'}
              </pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ChallengeParticipants
            challengeHost={challengeState.creator}
            participants={challengeState.participants}
          />

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h3 className="text-lg font-medium text-gray-900">Challenge</h3>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-2">
                {mockChallenge.title}
              </h4>
              <p className="text-gray-600 mb-4">{mockChallenge.description}</p>
              <div className="bg-gray-50 rounded p-4">
                <h5 className="font-medium mb-2">Test Cases:</h5>
                <pre className="text-sm font-mono">
                  {mockChallenge.test_cases}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
