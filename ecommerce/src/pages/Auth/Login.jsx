import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContex'

function Login() {
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the login data to your backend
  login( email, password )
    // Reset form fields after submission
   
  }
  return (
    <>

<div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-md mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          E-comm
        </h1>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </header>
      <form className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="px-8 pb-8">
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot your password?</a>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register here
            </Link>
          </p>
    </div>
    </>
  )
}

export default Login