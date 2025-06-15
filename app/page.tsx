"use client";
import Card from "@/lib/components/Card";
import Button from "@/lib/ui/LoadMoreButton";
import Input from "@/lib/ui/Input";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PromptResponse } from "@/lib/utils/definitions";

function Home() {
  
  return (
    <>
      <Input />
   
    
      <Button>I don't like these</Button>
    </>
  );
}

export default Home;
