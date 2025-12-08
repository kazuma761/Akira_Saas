import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ProjectClientUI } from "./project-client-ui";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    }),
  );

  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    }),
  );

  return (
      <main className="fixed inset-0 overflow-hidden">
          <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<p>Loading Project...</p>}>
                  <ProjectView projectId={projectId}/>
                  {/* ProjectClientUI removed so only Vibe-Code shows */}
              </Suspense>
          </HydrationBoundary>
      </main>
  );
};

export default Page;