/*
 * Copyright 2021 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useApi, githubAuthApiRef } from '@backstage/core-plugin-api';
import { Octokit } from '@octokit/rest';
import { useAsync } from 'react-use';

export const useGithubUrl = (url: string) => {
  const githubAuthApi = useApi(githubAuthApiRef);

  return useAsync(async () => {
    const token = await githubAuthApi.getAccessToken(['repo']);

    const response = await new Octokit({
      auth: token,
      baseUrl: 'https://api.github.com',
    }).request({ url: url });

    return response.data;
  }, [githubAuthApi]);
};
