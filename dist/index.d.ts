import React from "react";

interface IUserLogProviderProps {
  project: string;
  api_key: string;
}
/**
 * Set up the UserLog provider
 * @param props: IUserLogProviderProps
 * @constructor
 */
declare const UserLogProvider: React.FC<React.PropsWithChildren<IUserLogProviderProps>>;

type TagKey = Lowercase<string>;
/** Tag Type **/
type Tags = Record<TagKey, string | number | boolean>;
/**
 * Options for publishing UserLog events
 */
interface TrackOptions {
  /**
   * Channel name
   * example: "registrations"
   */
  channel: string;
  /**
   * Event name
   * example: "New User"
   */
  event: string;
  /**
   * Event description
   * example: "user@example.com joined registration"
   */
  description?: string;
  /**
   * User ID
   * example: "user@example.com"
   */
  user_id?: string;
  /**
   * Event icon (emoji)
   * must be a single emoji
   * example: "🎉"
   */
  icon?: string;
  /**
   * Event tags
   * example: { username: "michael" }
   */
  tags?: Tags;
  /**
   * Send push notification
   */
  notify?: boolean;
  /**
   * Event timestamp
   */
  timestamp?: number | Date;
}

type ITracker = {
  /**
   * Set up the tracker with a api_key and project
   * @param api_key: your UserLog api_key
   * @param project: your UserLog project
   */
  setConfig: (api_key: string, project: string) => void;
  /**
   * Set the user id for the tracker
   * @param userId: a unique identifier for the user
   */
  setUserId: (userId: string | number) => void;
  /**
   * Clear the user id for the tracker
   */
  clearUserId: () => void;
  /**
   * Set the debug flag for the tracker
   * @param flag
   */
  setDebug: (flag: boolean) => void;
  /**
   * Track a custom event
   * @param options
   */
  track(options: TrackOptions): void;
};

declare global {
  interface Window {
    userlogq: [keyof ITracker, ...unknown[]][] | undefined;
    userlog: (...args: [keyof ITracker, ...unknown[]]) => void;
    userlogi: boolean;
  }
}

/**
 * UserLog Hook
 * @description
 */
declare const useUserLog: () => {
  setDebug: (flag?: boolean) => void;
  setUserId: (userId: string) => void;
  clearUserId: () => void;
  track: (options: TrackOptions) => void;
};

export { UserLogProvider, useUserLog };
