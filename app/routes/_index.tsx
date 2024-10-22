import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

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
import { useLoaderData } from "@remix-run/react";

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

type ItchIoGame = {
  published_at?: string;
  created_at?: string;
  min_price?: number;
  type?: string;
  downloads_count?: number;
  views_count?: number;
  purchases_count?: number;
  p_android?: boolean;
  url?: string;
  published?: boolean;
  p_windows?: boolean;
  p_osx?: boolean;
  p_linux?: boolean;
  in_press_system?: boolean;
  can_be_bought?: boolean;
  short_text?: string;
  has_demo?: boolean;
  cover_url?: string;
  title?: string;
  classification?: string;
  id?: number;
  user?: {
    id: number;
    cover_url: string;
    url: string;
    display_name: string;
    username: string;
  };
  // embed?: [Object];
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const key = context.cloudflare.env.ITCH_IO_API_KEY;

  const res = await fetch(`https://itch.io/api/1/key/my-games`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal: request.signal,
  });

  const data = (await res.json()) as { games: ItchIoGame[] };

  const games = data.games
    .filter((game) => game.published_at)
    .map((game) => ({
      title: game.title,
      description: game.short_text,
      href: game.url,
      img: game.cover_url,
      isPrimaryDev: game?.user?.id === 10083948,
    }));

  return games;
};

type ListProps = {
  title: string;
  items: {
    icon: IconDefinition;
    description: string;
    title: string;
    href?: string;
  }[];
};
function ProfileList({ title, items }: ListProps) {
  return (
    <div className="px-4">
      {/* <h2 className="text-xl px-5 mt-4 mb-1 font-bold">{title}</h2> */}
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
                  className="flex-initial p-2"
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
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full max-w-[640px] m-auto min-h-screen border-neutral-300 dark:border-neutral-700 sm:border-x-2">
      <header className="px-8 pt-8 mb-8">
        <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left">
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
        <ProfileList title="Profiles" items={profiles} />
        {/* <List title="Games" items={games} /> */}
        <div className="px-2">
          <h2 className="text-3xl px-5 mt-4 mb-1 font-bold">Games</h2>
        </div>
        <div className="flex flex-wrap px-6">
          {data.map((game) => (
            <a
              key={game.href}
              href={game.href}
              className="w-full sm:w-1/2 p-2 items-center"
            >
              <img src={game.img} className="w-full" />
              <div className="my-3">
                <div className="text-2xl font-bold text-neutral-800 dark:text-1b-white">
                  {game.title}
                </div>
                <div className="my-1 text-xl font-bold text-neutral-500 dark:text-neutral-400">
                  {game.description}
                </div>
                {!game.isPrimaryDev && (
                  <span className="px-2 py-1 bg-neutral-500 rounded-md">
                    Assisted
                  </span>
                )}
              </div>
            </a>
          ))}
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
    icon: faDiscord,
    title: "solarlabyrinth",
    description: "Discord Username",
  },
  {
    icon: faBluesky,
    title: "@solarlabyrinth.dev",
    description: "Bluesky",
    href: "https://bsky.app/profile/solarlabyrinth.dev",
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
    href: "https://tom-milman.itch.io/saloon-king",
  },
];
