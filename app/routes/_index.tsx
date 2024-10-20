import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  faTwitch,
  faItchIo,
  faGithub,
  faBluesky,
  faXTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "SolarLabyrinth" },
    { name: "description", content: "Solar's Website" },
  ];
};

export default function Index() {
  return (
    <div className="w-full max-w-[600px] m-auto h-screen border-neutral-300 dark:border-neutral-700 border-x-2">
      <header className="px-8 pt-8 mb-8">
        <img src="" alt="" />
        <div className="flex gap-4 items-center">
          <img
            className="size-24 rounded-full"
            src="/owl-left.png"
            alt=""
            width="384"
            height="512"
          />
          <div>
            <h1 className="text-2xl font-bold">SolarLabyrinth</h1>
            <p>
              Elden Lord that does software and game dev in their free time.
            </p>
          </div>
        </div>
      </header>
      <main className="px-4">
        <h2 className="text-xl px-3 my-2 font-bold">Profiles</h2>
        <ul>
          {profiles.map((profile) => {
            const className =
              "flex items-center gap-2 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg";
            const contents = (
              <>
                <FontAwesomeIcon fixedWidth size="2x" icon={profile.icon} />
                <div>
                  <div className="text-md text-neutral-800 dark:text-1b-white">
                    {profile.profileName}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {profile.name}
                  </div>
                </div>
              </>
            );
            return (
              <li key={profile.name}>
                {profile.link ? (
                  <a href={profile.link} className={className}>
                    {contents}
                  </a>
                ) : (
                  <div className={className}>{contents}</div>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

const profiles = [
  {
    icon: faTwitch,
    name: "Twitch",
    profileName: "SolarLabyrinth",
    link: "https://www.twitch.tv/solarlabyrinth",
  },
  {
    icon: faItchIo,
    name: "Itch",
    profileName: "SolarLabyrinth",
    link: "https://solarlabyrinth.itch.io/",
  },
  {
    icon: faGithub,
    name: "Github",
    profileName: "SolarLabyrinth",
    link: "https://github.com/SolarLabyrinth",
  },
  {
    icon: faBluesky,
    name: "Bluesky",
    profileName: "@solarlabyrinth.dev",
    link: "https://bsky.app/profile/solarlabyrinth.dev",
  },
  {
    icon: faXTwitter,
    name: "Twitter",
    profileName: "@solarlabyrinth",
    link: "https://x.com/solarlabyrinth",
  },
  {
    icon: faDiscord,
    name: "Discord",
    profileName: "solarlabyrinth",
  },
];
