import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">Home page</div>
    </Suspense>
  );
}
