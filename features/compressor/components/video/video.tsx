import { FC } from "react";
import { Details } from "./components/details";
import { Compressor } from "./components/compressor";

export const Video: FC = () => {
  return (
    <div className="col-span-2  rounded-2xl bg-primary/5 dark:bg-background dark:border">
      <div className="min-h-[450px]  rounded-2xl p-4">
        <Compressor />
      </div>
      <Details />
    </div>
  );
};
