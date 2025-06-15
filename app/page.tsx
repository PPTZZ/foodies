import Card from "@/lib/components/Card";
import Button from "@/lib/ui/LoadMoreButton";
import Input from "@/lib/ui/Input";
import React from "react";

function Home() {
  return (
    <>
      <Input />
      <Card title="Card Title" time="instant" />
      <Button>I don't like these</Button>
    </>
  );
}

export default Home;
