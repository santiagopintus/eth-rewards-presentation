import { Block } from "@src/model/blocks.interface";
import React from "react";

type BlocksRenderProps = {
  blocks: Block[];
};

const BlocksRender = ({ blocks }: BlocksRenderProps) => {
  return (
    <div>
      {blocks.map((block) => (
        <div key={block.date.date}>
          <p>{block.date.date}</p>
          <p>{block.reward}</p>
        </div>
      ))}
    </div>
  );
};

export default BlocksRender;
