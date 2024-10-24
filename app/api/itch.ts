type ItchIoMe = {
  username: string;
  gamer: boolean;
  display_name: string;
  cover_url: string;
  url: string;
  press_user: boolean;
  developer: boolean;
  id: number;
};
type ItchIoMeResponse = {
  user?: ItchIoMe;
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
  embed?: {
    width?: number;
    height?: number;
    fullscreen?: boolean;
  };
};
type ItchIoMyGamesResponse = {
  games?: ItchIoGame[];
};

export async function fetchMe(key: string, signal: AbortSignal) {
  console.log("Fetching Me");
  const res = await fetch(`https://itch.io/api/1/key/me`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal: signal,
  });

  const data = (await res.json()) as ItchIoMeResponse;
  return data;
}

export async function fetchMyGames(key: string, signal: AbortSignal) {
  console.log("Fetching Games");
  const res = await fetch(`https://itch.io/api/1/key/my-games`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal: signal,
  });

  const data = (await res.json()) as ItchIoMyGamesResponse;
  return data;
}

export type Game = {
  title?: string;
  description?: string;
  href?: string;
  img?: string;
  isPrimaryDev: boolean;
};

export async function getItchGames(key: string, signal: AbortSignal) {
  const [meResponse, gamesResponse] = await Promise.all([
    fetchMe(key, signal),
    fetchMyGames(key, signal),
  ]);

  const games: Game[] =
    gamesResponse?.games
      ?.filter((game) => game?.published_at)
      ?.map((game) => ({
        title: game?.title,
        description: game?.short_text,
        href: game?.url,
        img: game?.cover_url,
        isPrimaryDev: game?.user?.id === meResponse?.user?.id,
      })) ?? [];

  return games;
}
