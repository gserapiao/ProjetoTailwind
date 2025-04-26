import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchGitHubUser, GitHubUser } from '../services/githubApi';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7fafc; /* gray-100 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ProfileCard = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  width: 100%;
  max-width: 24rem; /* max-w-sm */
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 8rem; /* w-32 */
  height: 8rem; /* h-32 */
  border-radius: 9999px; /* rounded-full */
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem; /* mb-4 */
  border: 4px solid #e2e8f0; /* border-4 border-gray-300 */
`;

const UserName = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  margin-bottom: 0.5rem; /* mb-2 */
`;

const RepoCount = styled.p`
  color: #4a5568; /* text-gray-600 */
  margin-bottom: 1rem; /* mb-4 */
`;

const NavButton = styled(Link)`
  margin-top: 1rem; /* mt-4 */
  display: inline-block;
  background-color: #4299e1; /* bg-blue-500 */
  color: white;
  font-weight: 700; /* font-bold */
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.25rem; /* rounded */
  transition: background-color 0.3s ease; /* transition duration-300 */

  &:hover {
    background-color: #2b6cb0; /* hover:bg-blue-700 */
  }
`;

const GitHubLink = styled.a`
    color: #4299e1; /* text-blue-500 */
    &:hover {
        text-decoration: underline; /* hover:underline */
    }
`;

const LoadingText = styled.p`
    color: #a0aec0; /* text-gray-500 */
`;

const ErrorText = styled.p`
    color: #f56565; /* text-red-500 */
`;

const ProfileStyled: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'gserapiao'; 
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
    <PageContainer>
      <ProfileCard>
        {loading && <LoadingText>Carregando perfil...</LoadingText>}
        {error && <ErrorText>Erro: {error}</ErrorText>}
        {userData && (
          <>
            <ProfileImage
              src={userData.avatar_url}
              alt={`${userData.name || userData.login}'s avatar`}
            />
            <UserName>{userData.name || userData.login}</UserName>
            <RepoCount>Repositórios Públicos: {userData.public_repos}</RepoCount>
            <NavButton to="/profile-tailwind">
              Ver com Tailwind CSS
            </NavButton>

          </>
        )}
      </ProfileCard>
    </PageContainer>
  );
};

export default ProfileStyled;

