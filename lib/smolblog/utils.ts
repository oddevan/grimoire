export function smolblogGetSettings(smolblogAccessCode: string): RequestInit {
	return {
		method: 'GET',
		headers: { Authorization: `Bearer ${smolblogAccessCode}` },
		credentials: 'omit'
	};
}

export function smolblogPostSettings(smolblogAccessCode: string): RequestInit {
	return {
		method: 'GET',
		headers: { Authorization: `Bearer ${smolblogAccessCode}` },
		credentials: 'omit'
	};
}