import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';

import FAQs from '~/components/widgets/FAQs';
import Features from '~/components/widgets/Features';
import Features3 from '~/components/widgets/Features3';
import Features4 from '~/components/widgets/Features4';
import Hero2 from '~/components/widgets/Hero2';
import Stats from '~/components/widgets/Stats';
import Steps from '~/components/widgets/Steps';
import Team2 from '~/components/widgets/Team2';
import Testimonials2 from '~/components/widgets/Testimonials2';
import {
  contactAbout,
  faqsAbout,
  featuresFourAbout,
  featuresFourAboutTwo,
  features3About,
  hero2About,
  statsAbout,
  stepsAbout,
  testimonials2About,
  featuresAbout,
  teamAbout,
} from '~/shared/data/pages/about.data';

import cosimaAbout from '~/assets/images/cosima.jpeg'
import plumeAbout from '~/assets/images/postit.jpg'
import { Ubuntu, Anton, Play, Permanent_Marker } from 'next/font/google';
import Image from 'next/image';

const headerText = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const bodyText = Play({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const bodyText2 = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `About us`,
};

// const Page = () => {
//   return (
//     <>
//       <Hero2 {...hero2About} />
//       <Stats {...statsAbout} />
//       <Features4 {...featuresFourAbout} />
//       <Features4 {...featuresFourAboutTwo} />
//       <Steps {...stepsAbout} />
//       <Features3 {...features3About} />
//       <Features {...featuresAbout} />
//       <Team2 {...teamAbout} />
//       <Testimonials2 {...testimonials2About} />
//       <FAQs {...faqsAbout} />
//       <Contact {...contactAbout} />
//     </>
//   );
// };

const Page = () => {
  return (
    <>
      <section id="about-main">
        <div className="mx-auto max-w-7xl px-4 pt-[72px] sm:px-6 md:flex md:h-screen 2xl:h-auto">
          <div className="block py-12 text-center md:flex md:py-12 md:text-left lg:py-16">
            <div className="mx-auto flex max-w-5xl basis-[56%] items-center">
              <div className="max-w-3xl pb-12 pr-0 md:py-0 md:pr-8 md:pb-0 lg:pr-16">
                <h1 className={`leading-tighter font-heading mb-4 px-4 text-5xl font-bold tracking-tighter md:px-0 md:text-[3.48rem] ${headerText.className}`} style={{ color: '#e61f93'}} >
                  ABOUT
                </h1>
                <div className={`text-center ${bodyText.className}`} style={{ color: '#060644' }}>
                  <p>
                    Welcome to POST IT, the digital diary of two inspired girls!!
                  </p>
                  <p>
                    Here, you’ll find our thoughts on fashion trends, decoration trends, personal thoughts, and lifestyle choices. We are both passionate about traveling, fashion, art - passions we want to conceptualize through our blog. Join the messy adventure while we figure out what our life and surroundings will look like throughout our twenties!
                  </p>
                </div>
              </div>
            </div>
            <div className="block flex-1 items-center md:flex">
              <div className="relative m-auto h-full max-w-4xl object-cover">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: '#e61f93' }} id="about-cosima">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Image container with aspect ratio */}
            <div className="w-full md:w-1/2 relative aspect-square md:ml-0">
              <Image
                src={cosimaAbout}
                alt={"Cosima about picture"}
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"

              />
            </div>

            {/* Content container */}
            <div className="w-full md:w-1/2 space-y-4 text-right" style={{ color: '#060644' }}>
              <h1 className={`leading-tighter font-heading mb-4 px-4 text-5xl font-bold tracking-tighter md:px-0 md:text-[3.48rem] ${headerText.className}`}>MEET COSIMA</h1>
              <p className={`text-lg leading-relaxed ${bodyText2.className}`}>
                Hi, I’m Cosima! An exiled parisian studying in New York City. I’m a libra... so indecisive about a lot, especially my future. Join me along this adventure as I depict the evolving world around me and trace down my personal thoughts and doubts. I hope some of you can identify and feel seen or heard.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: 'white' }} id="about-plume">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-16 items-start">


            {/* Content container */}
            <div className="w-full md:w-1/2 space-y-4 text-left" style={{ color: '#6f28b5' }}>
              <h1 className={`leading-tighter font-heading mb-4 px-4 text-5xl font-bold tracking-tighter md:px-0 md:text-[3.48rem] ${headerText.className}`}>MEET PLUME</h1>
              <p className={`text-lg leading-relaxed ${bodyText2.className}`}>
                FILLER
              </p>
            </div>

            {/* Image container with aspect ratio */}
            <div className="w-full md:w-1/2 relative aspect-square md:ml-0">
              <Image
                src={plumeAbout}
                alt={"Plume about picture"}
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page;
