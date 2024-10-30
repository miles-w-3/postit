import type { Metadata } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import postitBase from '../../../src/assets/images/postit.jpg'

import { findLatestPosts, SPACES_DIRS, ParsedPost } from '~/utils/posts';

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
  //console.log(`Read posts as ${JSON.stringify(posts)}`)
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          {spaceName.toUpperCase()}
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
        {posts.map(({ slug, title, image }: { slug: string, title: string, image: string, dir: string }) => (
          <div key={slug} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <Link href={`/spaces/${spaceName}/${slug}`}>
              <Image width={650} height={340} alt={title} src={image ? `${image}` : postitBase} />
              <h2 className="p-4 font-bold">{title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
