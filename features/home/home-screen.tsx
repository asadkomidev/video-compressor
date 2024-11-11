"use client";

import { FC, Suspense } from "react";

export const HomeScreen: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">Home page</div>
    </Suspense>
  );
};
