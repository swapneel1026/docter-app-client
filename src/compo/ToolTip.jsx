import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { InfoCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";

const TooltipBox = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button>
            <Pencil2Icon className="hover:cursor-not-allowed" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-red-500 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-xs leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            Cannot change after doctors confirmation!
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipBox;
