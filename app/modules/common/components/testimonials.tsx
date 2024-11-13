import { cn } from "@/app/utils/cn";
import Marquee from "react-fast-marquee";

const reviews = [
  {
    name: "Cliente Satisfecha",
    username: "@jack",
    body: "Me encanta la calidad de los productos y la atención al cliente. ¡Recomendado!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Cliente Feliz",
    username: "@jill",
    body: "¡Excelente servicio! Los productos son de calidad y el envío fue rápido. ¡Gracias!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Cliente Satisfecho",
    username: "@john",
    body: "Buena calidad y excelente atención al cliente. ¡Recomendado!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Cliente Feliz",
    username: "@jane",
    body: "¡Excelente servicio! Los productos son de calidad y el envío fue rápido. ¡Gracias!",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Cliente Satisfecho",
    username: "@jenny",
    body: "Buena calidad y excelente atención al cliente. ¡Recomendado!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Cliente Feliz",
    username: "@james",
    body: "¡Excelente servicio! Los productos son de calidad y el envío fue rápido. ¡Gracias!",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 mx-2 cursor-pointer overflow-hidden rounded-xl p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export const Testimonials = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full basis-1/3 flex-col items-center justify-center",
        "overflow-hidden rounded-lg bg-background py-20",
        className,
      )}
    >
      <Marquee gradient>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee direction="right" gradient>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};
