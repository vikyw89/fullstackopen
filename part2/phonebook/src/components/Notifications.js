import React from "react"

const Notifications = ({notif}) => {
    console.log('MessagePop', notif)
    if (!notif) {
      return
    }
    if (notif.success) {
      return (
        <div className="fs-4 alert alert-success">
            {notif.success}
        </div>
      )}
    if (notif.error) {
      return (
        <div className="fs-4 alert alert-danger">
            {notif.error}
        </div>
      )}
  }

export default Notifications