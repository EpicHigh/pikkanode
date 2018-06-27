const sessionStore = {},
	sessionConfig = {
		key: "sess",
		maxAge: 1000 * 60 * 60,
		httpOnly: true,
		store: {
			get(key, maxAge, {rolling}) {
				return sessionStore[key];
			},
			set(key, sess, maxAge, {rolling}) {
				sessionStore[key] = sess;
			},
			destroy(key) {
				delete sessionStore[key];
			}
		}
	};

module.exports = {
	sessionConfig
};
