// src/services/github.ts

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: ContributionDay[];
        }[];
      };
    };
  };
}

export async function getGitHubMetrics(username: string) {
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) throw new Error("Failed to fetch GitHub data");

    const { data }: { data: GitHubResponse } = await response.json();

    const calendar = data.user.contributionsCollection.contributionCalendar;

    // Formateador de fecha amigable (ej: "15 de ene, 2024")
    const dateFormatter = new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Aplanamos y tomamos los últimos 40 días
    const allDays = calendar.weeks
      .flatMap((week) => week.contributionDays)
      .slice(-40)
      .map((day) => ({
        ...day,
        // Formateamos la fecha aquí mismo para que el componente esté limpio
        formattedDate: dateFormatter.format(new Date(day.date)),
      }));

    // Agrupamos en columnas de 4
    const columns = [];
    for (let i = 0; i < allDays.length; i += 4) {
      columns.push(allDays.slice(i, i + 4));
    }

    return {
      total: calendar.totalContributions,
      columns,
    };
  } catch (error) {
    console.error("GitHub Service Error:", error);
    return { total: 0, columns: [] }; // Fallback
  }
}
