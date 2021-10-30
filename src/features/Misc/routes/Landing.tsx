import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Head } from 'src/components/Head';
import { useAuth } from 'src/lib/auth';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Head description="Welcome to graphql sandbox client" />
      <div className="h-[100vh] flex items-center">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            GraphQL Sandbox
          </h2>
          <p>Showcasing Best Practices For Building React Applications</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button
                type="button"
                variant="outline"
                uppercase
                onClick={handleStart}
              >
                Get started
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="https://github.com/so-rd/gql.client"
                target="_blank"
                rel="noreferrer"
              >
                <Button type="button" variant="outline" color="red" uppercase>
                  Github Repo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
