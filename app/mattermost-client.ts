import pkg from "@mattermost/client";

const { Client4 } = pkg;
const client = new Client4();

client.setUrl(process.env.MATTERMOST_URL!);
client.setToken(process.env.MATTERMOST_API_TOKEN!);

export default client;
