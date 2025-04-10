import createProvider from "@beliven/rb-data-provider-json-server";

export default createProvider("https://jsonplaceholder.typicode.com", {
  // Uncomment the following function to retrieve auth token
  // from local or session storages:
  // tokenGetter: () => {
  //   return (
  //     localStorage.getItem('rb-auth-token') ||
  //     sessionStorage.getItem('rb-auth-token')
  //   )
  // }
});
