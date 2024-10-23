import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faItchIo } from "@fortawesome/free-brands-svg-icons/faItchIo";
import { faMastodon } from "@fortawesome/free-brands-svg-icons/faMastodon";
import { faTwitch } from "@fortawesome/free-brands-svg-icons/faTwitch";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";

export async function getProfiles() {
  return profiles;
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
  {
    icon: faMastodon,
    title: "@SolarLabyrinth@mastodon.social",
    description: "Mastodon",
    href: "https://mastodon.social/@SolarLabyrinth",
  },
];
