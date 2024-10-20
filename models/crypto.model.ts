export interface Currency {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  "tag-names": string[];
  "tag-groups": string[];
  urls: Urls;
  platform: Platform;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: null;
  contract_address: Contractaddress[];
  self_reported_circulating_supply: null;
  self_reported_tags: null;
  self_reported_market_cap: null;
  infinite_supply: boolean;
}

interface Contractaddress {
  contract_address: string;
  platform: Platform2;
}

interface Platform2 {
  name: string;
  coin: Coin;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  slug: string;
}

interface Platform {
  id: string;
  name: string;
  slug: string;
  symbol: string;
  token_address: string;
}

interface Urls {
  website: string[];
  twitter: string[];
  message_board: string[];
  chat: string[];
  facebook: any[];
  explorer: string[];
  reddit: string[];
  technical_doc: any[];
  source_code: string[];
  announcement: string[];
}
