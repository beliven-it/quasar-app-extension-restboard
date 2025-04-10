import createProvider from "@beliven/rb-auth-provider-simple";

export default createProvider("http://localhost:3000/auth/login", {
  // Comment the following (mocked) client
  // to use a real, provided auth backend:
  client: async (url, opts) => {
    return {
      ok: true,
      json() {
        return {
          user: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        };
      },
    };
  },
});
