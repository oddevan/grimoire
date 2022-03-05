export function smolblogGetSettings(smolblogAccessCode: string): RequestInit {
	return {
		method: 'GET',
		headers: { Authorization: `Bearer ${smolblogAccessCode}` },
		credentials: 'omit'
	};
}
