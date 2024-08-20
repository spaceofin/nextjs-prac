import LazyComponent from "../components/LazyComponent";
import { Suspense } from "react";

export default function AboutPage() {
  return (
    <div className="z-10">
      <Suspense fallback={<p>Loading data...</p>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
