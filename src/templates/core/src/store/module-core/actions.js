import { WHITELIST_URLS } from "src/config";
import { authProvider } from "src/providers";

export async function login({ commit, getters, dispatch }, credentials) {
  commit("setLastError", null);
  commit("setLoading", true);
  try {
    const { data: user } = await authProvider.login(credentials);
    const identity = await authProvider.getIdentity(user);
    commit("setCurrentUser", user);
    commit("setLoading", false);
    commit("setUserIdentity", identity);
  } catch (err) {
    commit("setLastError", err.message);
    commit("setLoading", false);
    dispatch("logout");
  }
}

export async function logout({ commit }) {
  commit("setLastError", null);
  commit("setLoading", true);
  try {
    await authProvider.logout();
    commit("setCurrentUser", null);
    commit("setLoading", false);
    commit("setUserIdentity", "");
  } catch (err) {
    commit("setLastError", err.message);
    commit("setLoading", false);
  }
}

export async function recoverPassword({ commit }, email) {
  commit("setLastError", null);
  commit("setLoading", true);
  try {
    // TODO...
    commit("setLoading", false);
  } catch (err) {
    commit("setLastError", err.message);
    commit("setLoading", false);
  }
}

export async function checkRoutePermissions(
  { commit, dispatch, state },
  route
) {
  commit("setLastError", null);
  // Check first for whitelisted routes (don't require auth* at all)
  if (WHITELIST_URLS.includes(route.path)) {
    return;
  }
  // Authentication
  try {
    const { data: user } = await authProvider.checkAuth();
    const identity = await authProvider.getIdentity(user);
    commit("setCurrentUser", user);
    commit("setUserIdentity", identity);
    if (!user) {
      throw new Error(`Unauthorized access to ${route.fullPath}`);
    }
  } catch (err) {
    commit("setLastError", err.message);
    throw err;
  }
  // Authorization
  try {
    const routePerms = route.meta.permissions || [];
    await authProvider.can(state.currentUser, routePerms);
  } catch (err) {
    commit("setLastError", err.message);
    throw err;
  }
}
