import type { MetaFunction } from "@remix-run/cloudflare";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faItchIo } from "@fortawesome/free-brands-svg-icons/faItchIo";
import { faTwitch } from "@fortawesome/free-brands-svg-icons/faTwitch";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";

import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask";
import { faGhost } from "@fortawesome/free-solid-svg-icons/faGhost";
import { faHatCowboy } from "@fortawesome/free-solid-svg-icons/faHatCowboy";

import { cx } from "~/utils/cx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const title = "SolarLabyrinth";
const description =
  "Elden Lord that does software and game dev in their free time.";

export const meta: MetaFunction = () => {
  return [
    { title },
    {
      name: "description",
      content: description,
    },
  ];
};

type ListProps = {
  items: {
    icon: IconDefinition;
    description: string;
    title: string;
    href?: string;
  }[];
};
function List({ items }: ListProps) {
  return (
    <ul>
      {items.map((profile) => {
        const baseItemClassName = cx(
          "flex",
          "items-center",
          "gap-2",
          "p-2",
          "rounded-lg"
        );
        const linkClassName = cx(
          baseItemClassName,
          "hover:bg-neutral-200",
          "dark:hover:bg-neutral-700"
        );

        const contents = (
          <>
            {profile.icon && (
              <FontAwesomeIcon
                className="flex-initial"
                fixedWidth
                size="2x"
                icon={profile.icon}
              />
            )}
            <div className="flex-1">
              {profile.title && (
                <div className="text-xl font-bold text-neutral-800 dark:text-1b-white">
                  {profile.title}
                </div>
              )}
              {profile.description && (
                <div className="text-md font-bold text-neutral-500 dark:text-neutral-400">
                  {profile.description}
                </div>
              )}
            </div>
          </>
        );
        return (
          <li key={profile.description}>
            {profile.href ? (
              <a href={profile.href} className={linkClassName}>
                {contents}
              </a>
            ) : (
              <div className={baseItemClassName}>{contents}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Index() {
  return (
    <div className="w-full max-w-[600px] m-auto min-h-screen border-neutral-300 dark:border-neutral-700 border-x-2">
      <header className="px-8 pt-8 mb-8">
        <div className="flex gap-4 items-center">
          <img
            className="size-24 rounded-full"
            src="/owl-left.png"
            alt=""
            width="384"
            height="512"
          />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md font-semibold text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>
      </header>
      <main>
        <div className="px-4">
          <h2 className="text-xl px-3 mt-4 mb-1 font-bold">Profiles</h2>
          <List items={profiles} />
        </div>
        <div className="px-4">
          <h2 className="text-xl px-3 mt-4 mb-1 font-bold">Games</h2>
          <List items={games} />
        </div>
      </main>
    </div>
  );
}

const profiles = [
  {
    icon: faTwitch,
    title: "SolarLabyrinth",
    description: "Twitch",
    href: "https://www.twitch.tv/solarlabyrinth",
  },
  {
    icon: faItchIo,
    title: "SolarLabyrinth",
    description: "Itch",
    href: "https://solarlabyrinth.itch.io/",
  },
  {
    icon: faGithub,
    title: "SolarLabyrinth",
    description: "Github",
    href: "https://github.com/SolarLabyrinth",
  },
  {
    icon: faBluesky,
    title: "@solarlabyrinth.dev",
    description: "Bluesky",
    href: "https://bsky.app/profile/solarlabyrinth.dev",
  },
  {
    icon: faYoutube,
    title: "@TheSolarLabyrinth",
    description: "YouTube",
    href: "https://www.youtube.com/@TheSolarLabyrinth",
  },
  {
    icon: faXTwitter,
    title: "@solarlabyrinth",
    description: "Twitter",
    href: "https://x.com/solarlabyrinth",
  },
  {
    icon: faDiscord,
    title: "solarlabyrinth",
    description: "Discord",
  },
];

const games = [
  {
    icon: faFlask,
    title: "Aqua Regia",
    description:
      "Combine elemental essences, purify your alchemical solution, and turn lead into gold in this physics-based puzzle game.",
    href: "https://solarlabyrinth.itch.io/aqua-regia",
  },
  {
    icon: faGhost,
    title: "Lunariel",
    description:
      "Banish the shadow spirits and restore the light of Lunariel to this once-hallowed forest.",
    href: "https://solarlabyrinth.itch.io/lunariel",
  },
  {
    icon: faHatCowboy,
    title: "Saloon King",
    description:
      "Voice Acted for Tom Milman's Jern Jam 3 Entry. A short western shooter about a cowboy who wants to take over a Saloon and its town",
    href: "https://solarlabyrinth.itch.io/lunariel",
  },
];
