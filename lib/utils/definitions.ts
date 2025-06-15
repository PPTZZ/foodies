import React from "react";

export type TInputProps = {
  handleKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export type TButton = {
  children: string | React.ReactNode;
  onClick?: () => void;
};

export type TCardProps = {
  title: string;
  time: string;
};
type TPart = {
  text: string;
};
type TContent = {
  parts: TPart[];
};

export type TGenContentReq = {
  contents: TContent[];
  generationConfig?: {
    responseMimeType?: string;
  };
};

type TCandidate = {
  content: TContent;
};
export type TGenContentRes = {
  candidates: TCandidate[];
};

export type PromptResponse = {
  message?: string;
  data?: any; // Replace with your actual response type
  error?: string;
  isLoading?:boolean
};