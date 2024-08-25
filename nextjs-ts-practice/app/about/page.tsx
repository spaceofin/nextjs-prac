// import { ErrorBoundary } from "../components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
// import LazyComponent from "../components/LazyComponent";
import { Suspense } from "react";
// import ErrorThrower from "../components/ErrorThrower";

export default function AboutPage() {
  return (
    <div className="z-10">
      <Suspense fallback={<p>Loading data...</p>}>
        <ErrorBoundary fallback={<p>Oops!</p>}>
          {/* <LazyComponent /> */}
          {/* <ErrorThrower /> */}
          <div>Hello, This is About page.</div>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
