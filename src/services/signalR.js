import * as signalR from '@microsoft/signalr'

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_MAIN_API}/NotificationHub`, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Trace)
  .configureLogging(signalR.LogLevel.Information)
  .build()

connection.onclose(async () => {
  await startSocketConnection()
})

export async function startSocketConnection() {
  try {
    await connection.start()
    // eslint-disable-next-line no-console
    console.log('SignalR Connected successfully!')
    return { isConnected: true, connection }
  } catch (err) {
    console.error('SOCKET INITIAL CONNECT ERROR - ', err)
    setTimeout(startSocketConnection, 5000)
    return { isConnected: false }
  }
}
