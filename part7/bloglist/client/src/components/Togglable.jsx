import { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className={`${visible ? 'block' : 'hidden'}`}>
        <button 
          data-testid={buttonLabel} 
          onClick={toggleVisibility}
          className="mb-5 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          {buttonLabel}
        </button>
      </div>
      <div className={`${!visible ? 'block' : 'hidden'} bg-white shadow-md rounded-lg p-6 mt-4`}>
        <button 
          onClick={toggleVisibility}
          className="mb-5 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
          Cancel
        </button>
        {children}
      </div>
    </div>
  )
}

export default Togglable
