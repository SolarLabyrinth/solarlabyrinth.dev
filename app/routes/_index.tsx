import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cx } from "~/utils/cx";
import { useLoaderData } from "@remix-run/react";
import { getItchGames } from "~/api/itch";
import { getProfiles } from "~/api/profiles";

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

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const key = context.cloudflare.env.ITCH_IO_API_KEY;
  const games = await getItchGames(key, request.signal);
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

function ProfileList() {
  const { profiles } = useLoaderData<typeof loader>();

  return (
    <section>
      <ul className="px-4 md:columns-2">
        {profiles.map((profile) => {
          const baseItemClassName = "flex items-center gap-2 p-2 rounded-lg";
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
                <a
                  href={profile.href}
                  target="__blank"
                  rel="noopener noreferrer"
                  className={cx(
                    baseItemClassName,
                    "hover:bg-neutral-200",
                    "dark:hover:bg-neutral-700"
                  )}
                >
                  {contents}
                </a>
              ) : (
                <div className={baseItemClassName}>{contents}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function GamesList() {
  const { games } = useLoaderData<typeof loader>();

  return (
    <section>
      <h2 className="text-3xl px-7 mt-4 mb-1 font-bold">Games</h2>
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
                {!game.isPrimaryDev && (
                  <span className="px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded-md">
                    Assisted
                  </span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
