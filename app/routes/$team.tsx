import { AppShell, List, Tabs, ThemeIcon, rem } from "@mantine/core";

import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { NavLink } from "react-router-dom";

import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";

import client from "~/mattermost-client";

export async function loader({ params }: LoaderFunctionArgs) {
  const user = await client.getMe();
  const teams = await client.getTeamsForUser(user.id);
  const activeTeam = teams.find((team) => team.name === params.team);

  const allChannels = await client.getChannels(activeTeam!.id);
  const userChannels = await client.getMyChannels(user.id);
  const channels = allChannels.filter((channel) => userChannels.some((userChannel) => userChannel.id === channel.id));

  return json({ teams, activeTeam, channels });
}

export default function Index() {
  const { teams, activeTeam } = useLoaderData<typeof loader>();

  return (
    <AppShell.Navbar p="md">
      <Tabs variant="pills" orientation="vertical" value={activeTeam!.name}>
        <Tabs.List>
          {teams.map((team) => (
            <Tabs.Tab key={team.id} value={team.name}>
              <NavLink to={`/${team.name}`} relative="route" key={team.id}>
                {team.display_name}
                {/* {https://mattermost.brainhub.pl/api/v4/teams/jhtfmzoc8ibgtbicix8djj34wa/image} */}
                {/* <Image src={team.display_name} alt={team.display_name} /> */}
              </NavLink>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <AppShell.Main>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          <List.Item>Clone or download repository from GitHub</List.Item>
          <List.Item>Install dependencies with yarn</List.Item>
          <List.Item>To start development server run npm start command</List.Item>
          <List.Item>Run tests to make sure your changes do not break the build</List.Item>
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            Submit a pull request once you are done
          </List.Item>
        </List>

        <Outlet />
      </AppShell.Main>
    </AppShell.Navbar>
  );
}
