import { Dispatch, SetStateAction } from 'react';

type Data = {
  contents: {
    video: {
      channelId?: string;
      channelName?: string;
      lengthText?: string;
      publishedTimeText?: string;
      thumbnails?: unknown;
      videoId?: string;
      viewCountText?: string;
    };
  }[];
  estimatedResults?: string;
  next?: string;
  avatar?: {
    thumbnails?: {
      height?: number | string;
      url?: string | undefined;
      width?: number | string;
    }[];
  };
  subscriberCountText?: string;
  title?: string;
  vanityChannelUrl?: string;
};

export type TComponentProps = {
  data: Data;
};

export type THeaderProps = {
  toggleSidebar: () => void;
};

export type TSidebarProps = {
  isOpen: boolean;
};

export type TThumbnailProps = {
  item: any;
  loading: boolean;
};

export type TSearchFormProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  handleSearch: () => void;
};
