export type Group = {
  id: number;
  root: string;
  approved: boolean;
  abbr_name: string;
  full_name: string;
  how_generated: string;
  moderation_status: ModStatus;
  description: string;
  why_useful: string;
  static: boolean;
  last_update: Date;
  joint_name?: string;
  proof_id: number;
  proof: Proof;
  parent_group_id?: number;
  parent_group?: Group;
  child_groups?: Group[];
  credential_id: number;
  credential: Credential;
  leaves?: Leaf[];
  posts?: Post[];
  ext_nullifier?: string;
  nullifiers?: Nullifier[];
};

export type Leaf = {
  id: number;
  path?: string[];
  indices?: string[];
  user_id: number;
  user: User;
  group_id: number;
  group: Group;
};

export type Post = {
  id: number;
  msg: string;
  msg_hash: string;
  ipfs_hash?: string;
  tweet_id?: string;
  group_id: number;
  group: Group;
  nullifier_id?: number;
  nullifier?: Nullifier;
  votes?: Vote[];
};

export type Proof = {
  id: number;
  definition?: string;
  path_length?: number;
  vkey: string;
  zkey_link: string;
  circuit_link?: string;
  vkey_address?: string;
  filename: string;
  groups?: Group[];
};

export type User = {
  id: number;
  key: string;
  site_admin: boolean;
  leaves?: Leaf[];
};

export type Nullifier = {
  id: number;
  value: string;
  reputation?: number;
  group_id: number;
  group: Group;
  posts?: Post[];
  votes?: Vote[];
};

export type Vote = {
  id: number;
  value: string;
  post_id: number;
  post: Post;
  nullifier_id: number;
  nullifier: Nullifier;
};

export type Credential = {
  id: number;
  twitter_account: string;
  twit_consumer_key?: string;
  twit_consumer_secret?: string;
  twit_access_token?: string;
  twit_access_secret?: string;
  groups?: Group[];
};

export enum ModStatus {
  NONE = 'NONE',
  SITEADMIN = 'SITEADMIN',
  GROUPADMIN = 'GROUPADMIN',
}
