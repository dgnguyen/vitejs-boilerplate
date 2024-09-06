import { API_BASE_URL } from 'constants/endpoint'

export const API_ENDPOINT = {
  GET_AGENT: `${API_BASE_URL}/AdminAgent/getList`,
  UPDATE_AGENT: `${API_BASE_URL}/AdminAgent/update`,
  REMOVE_AGENT: `${API_BASE_URL}/AdminAgent/remove`,
  BLOCK_AGENT: `${API_BASE_URL}/AdminAgent/block`,
  UNBLOCK_AGENT: `${API_BASE_URL}/AdminAgent/unblock`,
  GET_DASHBOARD: `${API_BASE_URL}/AdminTransaction/getdashboards`,
  GET_PLAYER_TRACKING: `${API_BASE_URL}/AdminPlayer/getPlayersTracking`,
  DELETE_PLAYER_TRACKING: `${API_BASE_URL}/AdminPlayer/removePlayerTracking`,
  ADD_PLAYER_TRACKING: `${API_BASE_URL}/AdminPlayer/addPlayerTracking`,
  EXPORT_AGENT: `${API_BASE_URL}/AdminAgent/exportAgentList`,
  GET_GAME_BY_AGENT: `${API_BASE_URL}/AdminAgent/getGameByAgent`,
  GET_MARKET_BY_GAME: `${API_BASE_URL}/AdminAgent/getMarketByGame`,
  GET_EVENT_BY_MARKET: `${API_BASE_URL}/AdminAgent/getEventByMarket`,
  UPDATE_BET_LIMIT_AGENT: `${API_BASE_URL}/AdminAgent/betLimit/update`,
}
