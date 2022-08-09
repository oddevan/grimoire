export function smolblogGetSettings(smolblogAccessCode: string): RequestInit {
	return {
		method: 'GET',
		headers: { Authorization: `Bearer ${smolblogAccessCode}` },
		credentials: 'omit'
	};
}

export function smolblogPostSettings(smolblogAccessCode: string): RequestInit {
	return {
		method: 'POST',
		headers: { Authorization: `Bearer ${smolblogAccessCode}`, 'Content-type': 'application/json' },
		credentials: 'omit',
	};
}

export const api = {
	async get(endpoint: string, options: RequestInit = {}) {
		const response = await fetch(
			`${process.env.GRIMOIRE_API_BASE}${endpoint}`,
			{
				method: 'GET',
				...options
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(`Error from API: ${responseData.message ?? response.status}`);
		};
		
		return responseData;
	}
}