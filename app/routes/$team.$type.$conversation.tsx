import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import client from "~/mattermost-client";

export async function loader({ params }: LoaderFunctionArgs) {
  const { type, conversation } = params;

  // console.log(channel);
  // return json({ teams, activeTeam: params.team });
  return json({});
}

export default function Index() {
  // const { teams, activeTeam } = useLoaderData<typeof loader>();

  return "foo";
}
