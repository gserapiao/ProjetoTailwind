import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGitHubUser, GitHubUser } from '../services/githubApi';

const ProfileTailwind: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'octocat'; // Example username, can be made dynamic later

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGitHubUser(username);
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
        {loading && <p className="text-gray-500">Carregando perfil...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}
        {userData && (
          <>
            <img
              src={userData.avatar_url}
              alt={`${userData.name || userData.login}'s avatar`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"
            />
            <h2 className="text-2xl font-semibold mb-2">{userData.name || userData.login}</h2>
            <p className="text-gray-600 mb-4">Repositórios Públicos: {userData.public_repos}</p>
            <Link
              to="/profile-styled"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Ver com Styled Components
            </Link>

          </>
        )}
      </div>
    </div>
  );
};

export default ProfileTailwind;

