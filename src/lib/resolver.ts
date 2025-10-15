import type { AtpAgent } from '@atproto/api';
import { fetchPost, type PostData } from 'bluesky-post-embed/core';
import { onMount } from 'svelte';

export async function bskyUrlToAtUri(agent: AtpAgent, url: string): Promise<string> {
  const match = url.match(/^https:\/\/bsky\.app\/profile\/([^/]+)\/post\/([^/]+)/);
  if (!match) throw new Error('invalid Bsky URL');
  const [, handle, rkey] = match;
  const res = await agent.api.com.atproto.identity.resolveHandle({handle});
  const did = res.data.did;
  return `at://${did}/app.bsky.feed.post/${rkey}`;
}

export async function bskyUrlToPostData(agent: AtpAgent, url: string): Promise<PostData> {
  const uri = await bskyUrlToAtUri(agent, url);
  const data = await fetchPost({uri});
  return data;
}
