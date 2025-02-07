import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import Hero from '~/components/widgets/Hero';
import SocialProof from '../src/components/widgets/SocialProof';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Steps from '~/components/widgets/Steps';
import Testimonials from '~/components/widgets/Testimonials';
import FAQs2 from '~/components/widgets/FAQs2';
import Pricing from '~/components/widgets/Pricing';
import Team from '~/components/widgets/Team';
import CallToAction2 from '~/components/widgets/CallToAction2';
import Contact from '~/components/widgets/Contact';
import {
  callToAction2Home,
  contactHome,
  contentHomeOne,
  contentHomeTwo,
  faqs2Home,
  featuresHome,
  heroHome,
  pricingHome,
  socialProofHome,
  stepsHome,
  teamHome,
  testimonialsHome,
} from '~/shared/data/pages/home.data';
import postitBase from '~/assets/images/postit.jpg'
import { fetchPosts, ParsedPost } from '~/utils/posts';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Page() {
  const posts = await fetchPosts();
  const showingPosts: ParsedPost[] = [];
  for (const spaceName of Object.keys(posts)) {
    const spacePosts = posts[spaceName]
    if (spacePosts.length === 0) continue;
    const newestPost = spacePosts.slice(1).reduce((prev, current): ParsedPost => {
      if ( new Date(prev.publishDate) > new Date(current.publishDate)) {
        return prev;
      }
      return current;
    }, spacePosts[0])

    showingPosts.push(newestPost);
  }
  return (
    <>
      <Hero {...heroHome} />
      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
        <header>
          <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
            Featured Posts
          </h1>
        </header>
        <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
          {showingPosts.map(({ slug, title, image, dir }) => {
            // TODO: Clean up getting the space.
            const splitDir = dir.split('/');
            const spaceName = splitDir[splitDir.length - 1];
            // TODO: Need a standard post link component between here and spaces
            return (
              <div key={slug} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                <Link className="flex flex-col h-full" href={`/spaces/${spaceName}/${slug}`}>
                  <Image width={650} height={340} alt={title} src={image ? `${image}` : postitBase} />
                  <h2 className="p-4 mt-auto font-bold">{title}</h2>
                </Link>
              </div>
            )
          })}
        </div>
      </section>
      { false && (<>
        <SocialProof {...socialProofHome} />
        <Features {...featuresHome} />
        <Content {...contentHomeOne} />
        <Content {...contentHomeTwo} />
        <Steps {...stepsHome} />
        <Testimonials {...testimonialsHome} />
        <FAQs2 {...faqs2Home} />
        <Pricing {...pricingHome} />
        <Team {...teamHome} />
        <Contact {...contactHome} />
        <CallToAction2 {...callToAction2Home} />
      </>)}
    </>
  );
}
