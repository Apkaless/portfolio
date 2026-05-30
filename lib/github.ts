export type RepoStatus = "Active" | "Legacy" | "Archived-style";

export type PortfolioRepo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  htmlUrl: string;
  updatedAt: string;
  pushedAt: string | null;
  lastActivityAt: string;
  archived: boolean;
  fork: boolean;
  topics: string[];
  status: RepoStatus;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  pushed_at: string | null;
  archived: boolean;
  fork: boolean;
  topics?: string[];
};

type RepoFetchResult = {
  repos: PortfolioRepo[];
  error: string | null;
};

const GITHUB_REPOS_ENDPOINT = "https://api.github.com/users/Apkaless/repos";
const PAGE_SIZE = 100;
const ACTIVE_DAYS = 180;
const LEGACY_DAYS = 730;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function getRepoStatus(lastActivityAt: string, archived: boolean): RepoStatus {
  if (archived) {
    return "Archived-style";
  }

  const lastActivity = new Date(lastActivityAt).getTime();

  if (Number.isNaN(lastActivity)) {
    return "Legacy";
  }

  const ageDays = Math.floor((Date.now() - lastActivity) / MS_PER_DAY);

  if (ageDays <= ACTIVE_DAYS) {
    return "Active";
  }

  if (ageDays <= LEGACY_DAYS) {
    return "Legacy";
  }

  return "Archived-style";
}

function normalizeRepo(repo: GitHubRepo): PortfolioRepo {
  const lastActivityAt = repo.pushed_at ?? repo.updated_at;

  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    htmlUrl: repo.html_url,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    lastActivityAt,
    archived: repo.archived,
    fork: repo.fork,
    topics: repo.topics ?? [],
    status: getRepoStatus(lastActivityAt, repo.archived)
  };
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "apkaless-portfolio"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function fetchApkalessRepos(): Promise<RepoFetchResult> {
  const repos: PortfolioRepo[] = [];

  try {
    for (let page = 1; ; page += 1) {
      const url = new URL(GITHUB_REPOS_ENDPOINT);
      url.searchParams.set("per_page", String(PAGE_SIZE));
      url.searchParams.set("page", String(page));
      url.searchParams.set("type", "owner");
      url.searchParams.set("sort", "updated");

      const response = await fetch(url, {
        headers: getHeaders(),
        next: { revalidate: 1800 }
      });

      if (!response.ok) {
        return {
          repos,
          error: `GitHub returned ${response.status} while loading missions.`
        };
      }

      const pageRepos = (await response.json()) as GitHubRepo[];
      repos.push(...pageRepos.map(normalizeRepo));

      if (pageRepos.length < PAGE_SIZE) {
        break;
      }
    }

    return { repos, error: null };
  } catch {
    return {
      repos,
      error: "Mission telemetry is temporarily unavailable."
    };
  }
}

export function getFeaturedRepos(repos: PortfolioRepo[], limit = 6): PortfolioRepo[] {
  const scored = repos
    .map((repo) => {
      const hasDescription = repo.description ? 12 : 0;
      const active = repo.status === "Active" ? 20 : repo.status === "Legacy" ? 8 : 0;
      const source = !repo.fork ? 14 : 0;
      const maintained = !repo.archived ? 14 : 0;
      const engagement = Math.min(repo.stars * 3 + repo.forks * 2, 20);
      const language = repo.language ? 8 : 0;
      const topics = Math.min(repo.topics.length * 2, 8);
      const score = hasDescription + active + source + maintained + engagement + language + topics;

      return { repo, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.repo.lastActivityAt).getTime() - new Date(a.repo.lastActivityAt).getTime();
    });

  const selected = scored
    .filter(({ score }) => score >= 38)
    .map(({ repo }) => repo)
    .slice(0, limit);

  if (selected.length >= limit) {
    return selected;
  }

  const fill = repos
    .filter((repo) => !selected.some((selectedRepo) => selectedRepo.id === repo.id))
    .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
    .slice(0, limit - selected.length);

  return [...selected, ...fill];
}
