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

		const response = await fetch()

		return 'bob';
	}
}

/*		
		def sets
			tcgp_request('catalog/categories/3/groups?limit=200')
		end

		def set_info(set_id)
			info = tcgp_request("catalog/groups/#{set_id}")
			return info[0]
		end

		def cards_from_set( set_id, quantity: 200, offset: 0 )
			begin
				return tcgp_request('catalog/products?categoryId=3&productTypes=Cards&' +
					"groupId=#{set_id}&getExtendedFields=true&includeSkus=true&" +
					"offset=#{offset}&limit=#{quantity}")
			rescue TcgplayerException => e
				# If we get a 404 error with an offset > 0, then we've gotten to the end.
				# Just return an empty array.
				return [] if e.http_response.code == 404 && offset > 0
				raise
			end
		end

		def prices_for_skus( skus )
			tcgp_request('pricing/sku/' + skus.join(','))
		end

		private

		def get_access_key
			Transient.get(:tcgp_access_key) || authenticate
		end
		
		def authenticate
			unless ENV['TCGP_PUBLIC_ID'] && ENV['TCGP_PRIVATE_ID']
				raise 'TCGplayer keys are not set'
			end
			
			response = RestClient.post(
				'https://api.tcgplayer.com/token',
				{
					'grant_type' => 'client_credentials',
					'client_id' => ENV['TCGP_PUBLIC_ID'],
					'client_secret' => ENV['TCGP_PRIVATE_ID']
				},
				{
					'User-Agent' => ENV['TCGP_APP_NAME']
				}
			)

			unless [200, 201].include? response.code
				raise "Error from TCGplayer: #{response.body}"
			end

			token_info = JSON.parse response.body
			Transient.set :tcgp_access_key, token_info['access_token'], Time.now + token_info['expires_in']

			return token_info['access_token']
		end

		def tcgp_request(endpoint)
			# @access_key ||= self.get_access_key
			begin
				response = RestClient.get(
					"http://api.tcgplayer.com/v1.39.0/#{endpoint}",
					{
						'User-Agent' => ENV['TCGP_APP_NAME'],
						'Authorization' => "Bearer #{@access_key}",
						'Accept'        => 'application/json',
						'Content-Type'  => 'application/json',
					}
				)
			rescue RestClient::ExceptionWithResponse => e
				response = e.response
			end

			response_body = JSON.parse response.body
			unless [200, 201].include? response.code
				raise TcgplayerException.new(response), "Errors from TCGplayer: #{response_body['errors'].join(', ')}"
			end

			return response_body['results']
		end
*/