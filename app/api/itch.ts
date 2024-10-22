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

export type Game = {
  title?: string;
  description?: string;
  href?: string;
  img?: string;
  isPrimaryDev: boolean;
};
const MY_USER_ID = 10083948;

export async function getItchGames(key: string, signal: AbortSignal) {
  const res = await fetch(`https://itch.io/api/1/key/my-games`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
    signal: signal,
  });

  const data = (await res.json()) as { games: ItchIoGame[] };

  const games: Game[] =
    data?.games
      ?.filter((game) => game?.published_at)
      ?.map((game) => ({
        title: game?.title,
        description: game?.short_text,
        href: game?.url,
        img: game?.cover_url,
        isPrimaryDev: game?.user?.id === MY_USER_ID,
      })) ?? [];

  return games;
}
