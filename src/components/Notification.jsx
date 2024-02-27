const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: type === "success" ? "green" : "red",
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification