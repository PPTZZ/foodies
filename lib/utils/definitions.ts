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
  userPrompt: string | null;
  checked: boolean;
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
  id: string;
  title: string;
  time: string;
  instructions: string[];
  ingredients: string[];
  checked: boolean;
  map?: () => any;
};
