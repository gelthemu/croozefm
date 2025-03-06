"use client";

import { TwitterTweetEmbed } from "react-twitter-embed";
import React from "react";

const TWEET_IDS = {
  MAXX_CROSBY_TWEET: "1897358998472712481",
  MAXX_CROSBY_VIDEO: "1897359749236322590",
  ALISSON_ELLIOT_VIDEO: "1897408292621529254",
  TOMAS_MACHAC_VIDEO: "1896064504217420154",
  TOMAS_MACHAC_TWEET: "1896072159107449332",
  AWAKENING_MBRA_CITY: "1897496107208597898",
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

const MaxxCrosbyTweet = () => (
  <TweetEmbed tweetId={TWEET_IDS.MAXX_CROSBY_TWEET} />
);
const MaxxCrosbyVideo = () => (
  <TweetEmbed tweetId={TWEET_IDS.MAXX_CROSBY_VIDEO} />
);
const AlissonElliotVideo = () => (
  <TweetEmbed tweetId={TWEET_IDS.ALISSON_ELLIOT_VIDEO} />
);
const TomasMachacVideo = () => (
  <TweetEmbed tweetId={TWEET_IDS.TOMAS_MACHAC_VIDEO} />
);
const TomasMachacTweet = () => (
  <TweetEmbed tweetId={TWEET_IDS.TOMAS_MACHAC_TWEET} />
);
const AwakeningMbraCity = () => (
  <TweetEmbed tweetId={TWEET_IDS.AWAKENING_MBRA_CITY} />
);

export {
  MaxxCrosbyTweet,
  MaxxCrosbyVideo,
  AlissonElliotVideo,
  TomasMachacVideo,
  TomasMachacTweet,
  AwakeningMbraCity,
};
