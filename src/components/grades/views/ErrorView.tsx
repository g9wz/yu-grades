import { Button } from "@components/ui/button";

const ErrorView = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-7">
      <p className="text-center text-3xl lg:text-5xl">
        You probably entered
        <span className="text-destructive"> something</span> wrong 😕
      </p>
      <Button size="lg" asChild>
        <a href="/">Try Again</a>
      </Button>
    </div>
  );
};

export default ErrorView;
