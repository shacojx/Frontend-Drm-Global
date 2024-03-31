import { IconStar } from '@/assets/icons/IconStar';
import { cn } from '@/utils/cn.util';
import { range } from 'lodash-es';

const FEEDBACKS = [
  {
    content:
      'I love how easy it is to use this website. Even as someone who is not particularly tech-savvy, I was able to navigate it with ease. The analytics provided are comprehensive and insightful,',
    name: 'Sander Johnson',
    jobTitle: 'CEO Corps, USA',
  },
  {
    content:
      'The data presented in a clear and concise manner, along with the insightful knowledge provided, has helped me make better business decisions. Thank you for creating such a useful tool!',
    name: 'Emily Jock',
    jobTitle: 'CEO Olivia, SIN',
  },
  {
    content:
      'I stumbled upon this tool and was blown away by the analytics and insights it provided. The interface is user-friendly, and the data is presented in a visually appealing way. Highly recommend ...',
    name: 'Mark Smith',
    jobTitle: 'CEO Unilveir, USA',
  },
];

export const TestimonialSection = () => {
  return (
    <section className="mb-20 mt-28">
      <h4
        className={cn(
          'flex gap-4 items-center max-w-6xl mx-auto text-grey uppercase font-bold',
          'before:block before:bg-gradient-divider-l before:grow before:h-0.5',
          'after:block after:bg-gradient-divider-r after:grow after:h-0.5'
        )}
      >
        Testimonials
      </h4>

      <h2 className="mx-auto mt-8 max-w-2xl text-center text-4xl font-bold">
        <span className="text-gradient-primary">Trust </span>our clients
      </h2>

      <div className="mt-20 flex flex-col gap-5 overflow-hidden">
        <div className="infinite-scroll top-0 w-max gap-5">
          {[...FEEDBACKS, ...FEEDBACKS, ...FEEDBACKS, ...FEEDBACKS].map(({ content, jobTitle, name }) => (
            <div
              key={name}
              className="mr-5 inline-flex aspect-[5/3] w-[30vw] h-[304px] min-w-80 max-w-md flex-col justify-between gap-5 rounded-2xl bg-darkblue px-6 py-7 text-[#EFF3F7]"
            >
              <div className="flex gap-1">
                {range(5).map((idx) => (
                  <IconStar key={idx} />
                ))}
              </div>

              <div>{content}</div>

              <div>
                <div>{name}</div>
                <div>{jobTitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="infinite-scroll animation-reverse top-0 w-max gap-5">
          {[...FEEDBACKS, ...FEEDBACKS, ...FEEDBACKS, ...FEEDBACKS].map(({ content, jobTitle, name }) => (
            <div
              key={name}
              className=" mr-5 inline-flex aspect-[5/3] w-[30vw] h-[] min-w-80 max-w-md flex-col justify-between gap-5 rounded-2xl bg-darkblue px-6 py-7 text-[#EFF3F7]"
            >
              <div className="flex gap-1">
                {range(5).map((idx) => (
                  <IconStar key={idx} />
                ))}
              </div>

              <div>{content}</div>

              <div>
                <div>{name}</div>
                <div>{jobTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
