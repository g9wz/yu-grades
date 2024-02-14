import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import GradesForm from "@components/index";

import { Footer } from "@components/global";

export default function IndexPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center px-5 pt-12">
      <Card className="mt-auto w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>📚 Yu Grades</CardTitle>
          <CardDescription className="pt-2">
            No shenanigans, just your grades out of 100!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradesForm />
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
