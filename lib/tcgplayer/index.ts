class TCGplayer {
	private accessKey?: string;

	private async getAccessKey(): Promise<string> {
		this.accessKey ??= await this.authenticate();
		return this.accessKey;
	}

	private async authenticate(): Promise<string> {
		const clientId = process.env.TCGP_PUBLIC_ID;
		const clientSecret = process.env.TCGP_PRIVATE_ID;

		if (!clientId || !clientSecret) {
			throw "TCGplayer credentials not set.";
		}

		const response = await fetch(
			'https://api.tcgplayer.com/token',
			{
				method: 'POST',
				headers: { 'User-Agent': 'Grimoire by oddEvan' },
				body: JSON.stringify({
					grant_type: 'client_credentials',
					client_id: clientId,
					client_secret: clientSecret
				})
			}
		);
		if (!response.ok) {
			throw `Error from TCGplayer: ${response.body}`
		}

		const responseBody = await response.json();
		return <string>responseBody.access_token;
	}

	private async baseRequest(endpoint: string): Promise<any> {
		const authToken = await this.getAccessKey();

		const response = await fetch(
			`http://api.tcgplayer.com/v1.39.0/${endpoint}`,
			{
				method: 'GET',
				headers: {
					'User-Agent': 'Grimoire by oddEvan',
					Authorization: `Bearer ${authToken}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
			}
		);
		const responseBody = await response.json();

		if (!(response.ok || response.status == 404)) {
			throw `Error from TCGplayer: ${responseBody.errors.join(',')}`;
		}

		return responseBody.results ?? undefined;
	}

	////////////////

	async sets() {
		return await this.baseRequest('catalog/categories/3/groups?limit=200')
	}

	async setInfo(setId: number) {
		const info = await this.baseRequest(`catalog/groups/${setId}`);
		return info[0];
	}

	async cards_from_set(setId: number, quantity = 200, offset = 0) {
		return await this.baseRequest(`catalog/products?categoryId=3&productTypes=Cards&` +
			`groupId=${setId}&getExtendedFields=true&includeSkus=true&` +
			`offset=${offset}&limit=${quantity}`);
	}

	async prices_for_skus(skus: Array<number>) {
		return await this.baseRequest('pricing/sku/' + skus.join(','))
	}
}

const singleton = new TCGplayer();
export default singleton;
