import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: "SUPER_SECRET_KEY_FOR_LOCAL_CLIENT_AUTH_GATEWAY",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: "://googleusercontent.com",
      clientSecret: "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",
    },
  },
});