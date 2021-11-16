import { authProvider } from '../../providers'

export async function login ({ commit, getters, dispatch }, credentials) {
  commit('setLastError', null)
  commit('setLoading', true)
  try {
    const res = await authProvider.login(credentials)
    const user = res.data
    const identity = await authProvider.getIdentity(user)
    commit('setCurrentUser', user)
    commit('setLoading', false)
    commit('setUserIdentity', identity)
  } catch (err) {
    commit('setLastError', err.message)
    commit('setLoading', false)
    dispatch('logout')
  }
}

export async function logout ({ commit }) {
  commit('setLastError', null)
  commit('setLoading', true)
  try {
    await authProvider.logout()
    commit('setCurrentUser', null)
    commit('setLoading', false)
    commit('setUserIdentity', '')
  } catch (err) {
    commit('setLastError', err.message)
    commit('setLoading', false)
  }
}

export async function checkRoutePermissions (
  { commit, dispatch, state },
  route
) {
  commit('setLastError', null)
  // Authentication
  try {
    await authProvider.checkAuth()
  } catch (err) {
    commit('setLastError', err.message)
    return dispatch('logout')
  }
  // Authorization
  try {
    await authProvider.can(state.currentUser, route)
  } catch (err) {
    commit('setLastError', err.message)
  }
}
