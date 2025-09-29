import React from 'react'

const LoginPage = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Login
        </h2>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
          <div className="text-center mt-4 text-gray-700">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline font-semibold">Register now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage