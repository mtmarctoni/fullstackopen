import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (message === '') return null

  const baseClasses = 'px-4 py-3 rounded-md shadow-md text-sm font-medium mb-4'
  const typeClasses = {
    success: 'bg-green-100 text-green-800 border border-green-300',
    error: 'bg-red-100 text-red-800 border border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  }

  return (
    <div
      className={`fixed top-10 left-0 right-0 z-50 flex justify-start max-w-md ml-10 ${baseClasses} ${typeClasses[type]}`}
    >
      <p>{message}</p>
    </div>
  )
}

export default Notification
