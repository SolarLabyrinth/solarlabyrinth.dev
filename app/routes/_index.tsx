import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  faTwitch,
  faItchIo,
  faGithub,
  faBluesky,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "SolarLabyrinth" },
    { name: "description", content: "Solar's Website" },
  ];
};

export default function Index() {
  return (
    <div className="w-full max-w-[600px] m-auto flex flex-col gap-4 p-8">
      <header className="">
        <img src="" alt="" />
        <div>
          <h1 className="text-2xl font-bold">SolarLabyrinth</h1>
          <p>Elden Lord that does software and game dev in their free time.</p>
        </div>
      </header>
      <main>
        <div>
          <h2 className="sr-only">Profiles</h2>
          <ul className="flex flex-col gap-4 mt-2">
            {profiles.map((profile) => (
              <li key={profile.name}>
                <a href={profile.link} className="flex items-center gap-2">
                  <FontAwesomeIcon fixedWidth size="2x" icon={profile.icon} />
                  <div>
                    <div className="text-md">{profile.profileName}</div>
                    <div className="text-sm text-gray-400">{profile.name}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
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
];
