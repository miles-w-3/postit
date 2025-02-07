import md from 'markdown-it';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import postitBase from '~/assets/images/postit.jpg'

import { findPostBySlug, fetchPosts, findLatestPosts, SPACES_DIRS, fetchSlugs } from '~/utils/posts';

export const dynamicParams = false;

interface SpacesSlugParams {spaceName: string, slug: string}
interface SpacesSlugProps { params: SpacesSlugParams }

const getFormattedDate = (date: string) => date;


// export async function generateMetadata({ params}) {
//   const post = await findPostBySlug(params.slug);
//   if (!post) {
//     return notFound();
//   }
//   return { title: post.title, description: post.description };
// }

export async function generateStaticParams() {
  const postSlugs = fetchSlugs()
  const staticParams: SpacesSlugParams[] = []
  for (const [spaceName, spaceSlugs] of Object.entries(postSlugs)) {
    for (const slug of spaceSlugs) {
      staticParams.push({spaceName, slug})
    }
  }
  return staticParams;
}

export default async function Page({ params }: SpacesSlugProps) {
  const {spaceName, slug} = params

  const post = await findPostBySlug(slug, SPACES_DIRS[spaceName])
  if (!post) {
    console.log(`Could not find post`)
    return notFound();
  }

  if (!post.image) post.image = postitBase;

  return (
    <section className="mx-auto py-8 sm:py-16 lg:py-20">
      <article>
        <header className={post.image ? 'text-center' : ''}>
          <h1 className="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {post.title}

          </h1>
          <p className="mx-auto max-w-3xl px-4 sm:px-6">
            <time dateTime={post.publishDate}>{getFormattedDate(post.publishDate)}</time>
            {/* {Math.ceil(post.readingTime)} min read */}
          </p>
          {post.image ? (
            <Image
              src={post.image}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-6xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.description}
              loading="eager"
              priority
              width={900}
              height={480}
            />
          ) : (
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <div className="border-t dark:border-slate-700" />
            </div>
          )}
        </header>
        <div className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl">
          {post.content}
        </div>
      </article>
    </section>
  );
}
