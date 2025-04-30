"use client";
import Link from "next/link";

export interface SimpleCard {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  image?: string;
}

interface Props {
  cards: SimpleCard[];
}

export default function SimpleCardGrid({ cards }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {cards.map((card, index) => {
        const Wrapper = card.external ? "a" : Link;
        const props = card.external
          ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
          : { href: card.href };

        return (
          <Wrapper
         
            key={index}
            {...props}
            className="block border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all"
          >  
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {card.description}
            </p>
          </Wrapper>
        );
      })}
    </div>
  );
}
