export const alertMessage = (alert_type, message) => {
  return {
    type: 'ALERT_MESSAGE',
    alert_type,
    message,
  }
}

export const clear = () => {
  return {
    type: 'ALERT_CLEAR',
  }
}
