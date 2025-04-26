import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export interface GitHubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  public_repos: number;
  html_url: string; 
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await axios.get<GitHubUser>(`${GITHUB_API_BASE_URL}/users/${username}`);
    if (!response.data) {
        throw new Error('No data received from GitHub API');
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching GitHub user data:', error.response?.data || error.message);
      throw new Error(`Failed to fetch GitHub user ${username}: ${error.response?.statusText || error.message}`);
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred while fetching GitHub user data.');
    }
  }
};

