import { NextImage } from '@/components/NextImage';

import img_about_us_hero from '@/assets/images/about-us-hero.png';
import img_team_1 from '@/assets/images/team-1.png';
import img_team_2 from '@/assets/images/team-2.png';
import img_wise_corp from '@/assets/images/wise-corp.png';
import { cn } from '@/utils/cn.util';

export default function AboutUsPage() {
  return (
    <div className="px-4 pb-16 xl:px-0">
      <NextImage src={img_about_us_hero} alt="About Us" className={cn("aspect-video xl:aspect-[4/1] -mx-4")} />

      <div className="mx-auto max-w-6xl px-4 pt-16 xl:px-0">
        <h4 className="text-center text-4xl font-bold text-darkblue">About Us</h4>
        <div className="mx-auto mt-8 max-w-4xl text-center leading-8 text-grey">
          Dealroom Services is a Singapore-based consulting firm. We support individuals to set up businesses globally,
          at the same time protecting your personal wealth. We specialize in managing non-core functions of business so
          you can focus on the core one, helping your businesses to achieve better results.
        </div>
        <div className="mx-auto max-w-4xl text-center leading-8 text-grey">
          The core team consist of accountants, advisors and partners with exceptional and extensive contact networks
          globally. We are always ready to support your businesses, all the way from startup to exit stage and beyond.
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 xl:px-0">
        <h4 className="text-center text-4xl font-bold text-darkblue">Meet out team</h4>
        <div className="mx-auto mt-8 max-w-4xl text-center leading-8 text-grey">
          Our team is a group of passionate and dedicated individuals who are committed to making a difference. We are
          driven by a shared vision and a common set of values. We believe in the power of collaboration and teamwork,
          and we are always looking for ways to improve our skills and knowledge.We are proud of the work that we do,
          and we are always looking for new challenges. We are confident that we can achieve anything we set our minds
          to, and we are excited to see what the future holds.
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-4xl border p-6">
          <NextImage src={img_team_1} alt="Team" className="mx-auto aspect-square w-1/2" />
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-xl font-medium text-title">Eng Cheng Song</h3>
            <h4 className="text-center text-xl font-medium">Business Consultant</h4>
          </div>
          <div className="text-center text-grey">
            Cheng Song, has over 15 years of experiences in assisting business start-ups and delivering support services
            such as incorporation, secretarial services, accounting and tax services to clients across various
            industries.
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-4xl border p-6">
          <NextImage src={img_team_2} alt="Team" className="mx-auto aspect-square w-1/2" />
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-xl font-medium text-title">Shannen</h3>
            <h4 className="text-center text-xl font-medium">Business Development Director</h4>
          </div>
          <div className="text-center text-grey">
            Shannen, a graduate in Bachelor of Business (Marketing), is experienced in marketing and business
            development for more than 10 years. She joined DealRMS since January 2021 and is responsible for improving a
            company&apos;s market position and maximizing it financial growth.
          </div>
        </div>

        <div className="rounded-4xl border p-6">
          <h3 className="text-center text-3xl font-bold">Our Mission</h3>
          <div className="mt-6 text-center leading-8 text-grey">
            With an aim to foster and bridge business opportunities within the region, we are committed to delivering
            independent, objective and professional services to meet clients&apos; business goals, and to respond to
            business challenges with seamless services across industries and countries.
          </div>
        </div>

        <div className="rounded-4xl border p-6 xl:col-start-1">
          <h3 className="text-center text-3xl font-bold">Our Vision</h3>
          <div className="mt-6 text-center leading-8 text-grey">
            We see a future where you can fully focus on the growth of your business. As your trusted business partner,
            we give you the perfect platform to seize every opportunity, wherever you are and assist you with all our
            resources for your growth.
          </div>
        </div>

        <div className="rounded-4xl border p-6 xl:col-start-2 xl:row-span-2 xl:row-start-2">
          <h3 className="text-center text-3xl font-bold">Our Associates</h3>
          <div className="mt-6 text-center leading-8 text-grey">
            We strive to build an eco-system that compliment our services to provide the best solution for our client.
          </div>

          <NextImage src={img_wise_corp} alt="" className="mx-auto mt-8 aspect-[3/1] w-2/3" />

          <div className="mt-6 leading-8 text-grey">
            Wisecorp Pte. Ltd. (Registration No. 201820436K) is an accounting and corporate secretarial firm established
            in 2018 that provides company formation, corporate secretarial, accounting and taxation, payroll management,
            as well as other corporate administrative services for startups and small to medium enterprises. Wisecorp
            help individuals and business entities create value they are looking for, by delivering quality solutions in
            assurance, financial consultancy, accounting and tax advisory.
          </div>
        </div>
      </div>
    </div>
  );
}
