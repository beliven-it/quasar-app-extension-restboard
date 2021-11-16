export function setLoading (state, value) {
  state.loading = value
}

export function setLastError (state, err) {
  state.latestError = err
}

export function setCurrentUser (state, user) {
  state.currentUser = user
}

export function setUserIdentity (state, userIdentity) {
  state.userIdentity = userIdentity
}
