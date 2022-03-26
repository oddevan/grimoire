import { smolblogGetSettings } from "./utils";

export interface UserInfo {
	username: string;
	displayName: string;
}

export async function getCurrentUserInfo(smolblogAccessCode: string) : Promise<UserInfo | undefined> {
  if (!smolblogAccessCode) return undefined;
	
	const response = await fetch(
		process.env.NEXT_PUBLIC_SMOLBLOG_USER_ENDPOINT ?? "https://grimoireapp.smolblog.com/wp-json/wp/v2/users/me",
		smolblogGetSettings(smolblogAccessCode),
	);
	const userData = await response.json();

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${userData.message ?? response.status}`);
	};
	


  return response ? {
		username: userData.slug,
		displayName: userData.name,
	} : undefined;
}
