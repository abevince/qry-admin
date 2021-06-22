import * as React from 'react'

const LoginLayout: React.FC = ({ children }) => (
  <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
    <div className="flex flex-col bg-white py-6 px-8 rounded-lg shadow-lg">
      <img
        src="https://res.cloudinary.com/aralinks/image/upload/v1623233006/aralinks-logo_rt6b1u.svg"
        alt="Aralinks logo"
        className="w-20 mb-2 mx-auto"
      />
      {/* <h1 className="text-2xl tracking-wide font-bold mb-4">Aralinks QRY</h1> */}
      <h1 className="text-2xl font-semibold tracking-wide leading-tight mb-4 px-2 mx-auto">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 ">
          Phoenix
        </span>{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-blue-600 to-blue-500 ">
          Aralinks
        </span>
      </h1>
      <div>
        <div className="relative mb-2">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-lg font-medium text-gray-500">
              QRY
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
)

export default LoginLayout
