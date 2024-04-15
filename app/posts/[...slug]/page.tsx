import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { TracingBeam } from "@/components/ui/tracing-beam";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find(
    (post: { slugAsParams: string }) => post.slugAsParams === slug
  );

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post: { slugAsParams: string }) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <TracingBeam className="px-12 sm:px-6">
        {!post.draft ? (
          <>
            <h1 className="mb-2">{post.title}</h1>
            {post.description && (
              <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
                {post.description}
              </p>
            )}
            <hr className="my-4" />
            <Mdx code={post.body.code} />
          </>
        ) : (
          <>
            <h1 className="mb-2">{post.title}</h1>
            <p className="mt-8 text-sm font-bold text-slate-700 dark:text-slate-200">
              還在監修中...請慢慢等待 ：）
            </p>
          </>
        )}
      </TracingBeam>
    </article>
  );
}
