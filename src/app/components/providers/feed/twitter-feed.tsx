"use client";

import { TwitterTweetEmbed } from "react-twitter-embed";
import React from "react";

const TWEET_IDS = {
  TWEET_1897358998472712481: "1897358998472712481",
  TWEET_1897359749236322590: "1897359749236322590",
  TWEET_1897408292621529254: "1897408292621529254",
  TWEET_1896064504217420154: "1896064504217420154",
  TWEET_1896072159107449332: "1896072159107449332",
  TWEET_1897496107208597898: "1897496107208597898",
  TWEET_1897364097542578217: "1897364097542578217",
  TWEET_1898834551826227249: "1898834551826227249",
  TWEET_1899546714740048029: "1899546714740048029",
  TWEET_1901626548081271292: "1901626548081271292",
};

const DEFAULT_OPTIONS = { theme: "dark" };

interface TweetEmbedProps {
  tweetId: string;
  options?: Record<string, unknown>;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({
  tweetId,
  options = DEFAULT_OPTIONS,
}) => {
  return <TwitterTweetEmbed tweetId={tweetId} options={options} />;
};

const Tweet1897358998472712481 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1897358998472712481} />
);
const Tweet1897359749236322590 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1897359749236322590} />
);
const Tweet1897408292621529254 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1897408292621529254} />
);
const Tweet1896064504217420154 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1896064504217420154} />
);
const Tweet1896072159107449332 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1896072159107449332} />
);
const Tweet1897496107208597898 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1897496107208597898} />
);
const Tweet1897364097542578217 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1897364097542578217} />
);
const Tweet1898834551826227249 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1898834551826227249} />
);
const Tweet1899546714740048029 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1899546714740048029} />
);
const Tweet1901626548081271292 = () => (
  <TweetEmbed tweetId={TWEET_IDS.TWEET_1901626548081271292} />
);

export {
  Tweet1897358998472712481,
  Tweet1897359749236322590,
  Tweet1897408292621529254,
  Tweet1896064504217420154,
  Tweet1896072159107449332,
  Tweet1897496107208597898,
  Tweet1897364097542578217,
  Tweet1898834551826227249,
  Tweet1899546714740048029,
  Tweet1901626548081271292,
};