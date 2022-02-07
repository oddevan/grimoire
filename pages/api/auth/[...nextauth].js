import NextAuth from 'next-auth'

export default NextAuth({
  providers: [{
		id: "smolblog",
		name: "Smolblog",
		type: "oauth",
		wellKnown: "https://smolblog.com/.well-known/openid-configuration/",
		idToken: false,
		profile(profile) {
			return {
				id: profile.user_login,
				name: profile.display_name,
				email: profile.email,
			}
		},
		clientId: process.env.SMOLBLOG_APP_ID,
		clientSecret: process.env.SMOLBLOG_APP_SECRET,
	}],
	session: { strategy: "jwt" },
})
