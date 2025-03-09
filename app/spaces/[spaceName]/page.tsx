import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import PostLink from '~/components/blogs/PostLink';

import { findLatestPosts, SPACES_DIRS, ParsedPost, PostFrontmatter } from '~/utils/posts';

interface SpacesHomeParams { spaceName: string }
interface SpacesHomeProps { params: SpacesHomeParams }

// TODO: More custom metadata
export const metadata: Metadata = {
  title: 'Space',
};

// These ensure that when you're not in the spaces dirs, you get a 404
export const dynamic = 'force-static';
export const dynamicParams = false;

// Generate params for the spaces dirs
export async function generateStaticParams() {
  const params: SpacesHomeParams[] = Object.keys(SPACES_DIRS).map((name) => ({spaceName: name}))
  return params;
}

export default async function Home({ params }: SpacesHomeProps) {
  const spaceName = params.spaceName
  // FIXME: Would like to be able to use type, but need deconstruction to succeed
  const posts = await findLatestPosts({dir: SPACES_DIRS[spaceName]}) as any[]
  // sort newest first
  posts.sort((a, b) => new Date(a.publishDate) > new Date(b.publishDate) ? -1 : 1)
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          {spaceName.toUpperCase()}
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
        {posts.map(post => (
          <PostLink key={post.slug} post={post} spaceName={spaceName}/>
        ))}
      </div>
    </section>
  );
}
