import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import { Card, CardContent, CardHeader } from "@components/ui/card";

import type { Grade } from "@hooks/useFetchGrades";

import getGradeColor from "@utils/getGradeColor";
import formatSemester from "@utils/formatSemester";

interface GradesViewProps {
  currentSemester: string;
  gradesData: { semester: string; grades: Grade[] }[];
}

const GradesView = ({ currentSemester, gradesData }: GradesViewProps) => {
  const [selectedSemester, setSelectedSemester] =
    useState<string>(currentSemester);

  return (
    <div className="w-full px-4 py-28 md:px-14 xl:px-24">
      <Tabs defaultValue={selectedSemester} onValueChange={setSelectedSemester}>
        <div className="mb-5 flex items-center justify-center">
          {/* not the greatest design out there - but hey, it works */}
          <TabsList className="flex h-auto flex-wrap items-center justify-center space-y-1">
            {gradesData.map(
              ({ semester, grades }: { semester: string; grades: Grade[] }) => (
                <TabsTrigger
                  key={semester}
                  value={semester}
                  disabled={grades.length === 0}
                  className="lg:text-base"
                >
                  {formatSemester(semester)}
                </TabsTrigger>
              ),
            )}
          </TabsList>
        </div>
        {gradesData.map(({ semester, grades }) => (
          <TabsContent key={semester} value={semester}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {grades.map((grade, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-3">
                    <div className="grid grid-cols-[75%_25%] items-center gap-x-4 font-bold sm:grid-cols-[80%_20%]">
                      <h3 className="text-2xl">{grade.courseName}</h3>
                      <div
                        className="flex h-8 w-full items-center justify-center rounded-md text-center"
                        style={{
                          color: "white",
                          backgroundColor: getGradeColor(grade.gradeDesc),
                        }}
                      >
                        {grade.gradeDesc || "Null"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 font-medium [&>div>span]:font-normal [&>div>span]:text-muted-foreground">
                      <div>
                        Course Code: <span>{grade.courseCode}</span>
                      </div>
                      <div>
                        Credit Hours: <span>{grade.creditHours} Hours</span>
                      </div>
                      <div>
                        Confirmed Grade:{" "}
                        <span>
                          {grade.confirmedMark
                            ? `${grade.confirmedMark} out of 100`
                            : "Not Out Yet"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GradesView;
