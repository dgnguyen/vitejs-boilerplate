import * as signalR from '@microsoft/signalr'
import { API_BASE_URL } from 'constants/endpoint'

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${API_BASE_URL}/NotificationHub`, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
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

    console.log('SignalR Connected successfully!')
    return { isConnected: true, connection }
  } catch (err) {
    console.error('SOCKET INITIAL CONNECT ERROR - ', err)
    setTimeout(startSocketConnection, 5000)
    return { isConnected: false }
  }
}
