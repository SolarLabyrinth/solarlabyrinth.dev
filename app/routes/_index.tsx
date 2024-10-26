import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cx } from "~/utils/cx";
import { useLoaderData } from "@remix-run/react";
import { Game, getItchGames } from "~/api/itch";
import { getProfiles, Profile } from "~/api/profiles";
import { ReactNode } from "react";

const TITLE = "SolarLabyrinth";
const DESCRIPTION =
  "Elden Lord that does software and game dev in their free time.";

export const meta: MetaFunction = () => {
  return [
    {
      title: TITLE,
    },
    {
      name: "description",
      content: DESCRIPTION,
    },
  ];
};

async function getGamesCached({ request, context }: LoaderFunctionArgs) {
  try {
    const { env } = context.cloudflare;

    const key = env.ITCH_IO_API_KEY;
    const useCache = env.USE_CACHE !== "false";

    if (useCache) {
      const kv = env["solarlabyrinth.dev"];
      let games = await kv.get<Game[]>("itch-games", "json");
      if (!games) {
        games = await getItchGames(key, request.signal);
        await kv.put("itch-games", JSON.stringify(games), {});
      }
      return games;
    } else {
      return await getItchGames(key, request.signal);
    }
  } catch {
    return [];
  }
}

export const loader = async (args: LoaderFunctionArgs) => {
  const games = await getGamesCached(args);
  const profiles = await getProfiles();
  return { games, profiles };
};

export default function Index() {
  return (
    <div className="w-full max-w-[640px] m-auto min-h-screen border-neutral-300 dark:border-neutral-700 sm:border-x-2">
      <Header />
      <main>
        <ProfileList />
        <GamesList />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="px-8 pt-8 mb-8">
      <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:text-left">
        <img
          className="size-24 rounded-full"
          src="/owl-left.webp"
          alt="Profile Picture of a black and white owl with a rainbow bowtie"
        />
        <div>
          <h1 className="text-2xl font-bold">{TITLE}</h1>
          <p className="text-md font-semibold text-neutral-500 dark:text-neutral-400">
            {DESCRIPTION}
          </p>
        </div>
      </div>
    </header>
  );
}

type ProfileItemProps = {
  profile: Profile;
};

function ProfileItem({ profile }: ProfileItemProps) {
  const Tag = profile.href ? "a" : "div";
  const extraProps =
    Tag === "a"
      ? {
          href: profile.href,
          target: "__blank",
          rel: "noopener noreferrer",
        }
      : {};

  return (
    <Tag
      data-tag={Tag}
      className={cx(
        Tag === "a" ? "group" : "",
        "grid",
        "grid-cols-[auto_1fr]",
        "grid-rows-[auto_auto]",
        "gap-x-2",
        "items-center",
        "p-2",
        "rounded-lg",
        "motion-safe:transition-colors",
        "data-[tag=a]:hover:bg-neutral-200",
        "data-[tag=a]:dark:hover:bg-neutral-700"
      )}
      {...extraProps}
    >
      {profile.icon && (
        <FontAwesomeIcon
          className="row-span-2 p-2 group-hover:motion-safe:scale-110"
          fixedWidth
          size="2x"
          icon={profile.icon}
        />
      )}
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
    </Tag>
  );
}

function ProfileList() {
  const { profiles } = useLoaderData<typeof loader>();

  if (profiles.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="sr-only">Social Media Profiles</h2>
      <ul className="px-4 grid md:grid-cols-2">
        {profiles.map((profile) => (
          <li key={profile.description}>
            <ProfileItem profile={profile} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function GamesList() {
  const { games } = useLoaderData<typeof loader>();

  if (games.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl px-8 mt-4 mb-1 font-bold">Games</h2>
      <ul className="flex flex-wrap px-6">
        {games.map((game) => (
          <li key={game.href} className="w-full sm:w-1/2 p-2 items-center">
            <a href={game.href} target="__blank" rel="noopener noreferrer">
              <img
                src={game.img}
                className="w-full"
                alt={`Thumbnail for ${game.title}`}
              />
              <div className="my-3">
                <div className="text-2xl font-bold text-neutral-800 dark:text-1b-white">
                  {game.title}
                </div>
                <div className="my-1 text-xl font-bold text-neutral-500 dark:text-neutral-400">
                  {game.description}
                </div>
                {!game.isPrimaryDev && <Badge>Assisted</Badge>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

type BadgeProps = {
  children: ReactNode;
};
function Badge({ children }: BadgeProps) {
  return (
    <span className="px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded-md">
      {children}
    </span>
  );
}
