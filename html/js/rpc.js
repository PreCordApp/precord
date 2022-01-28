import * as RPC from "discord-rpc";
const client = new RPC.Client({ transport: "ipc" });
client.login({ clientId: "874351422559363103" });
const code = {
    details: "Activating the alpha",
    assets: {
        large_image: "cheezit",
        large_text: "Mmmm yum yum",
    },
    buttons: [
        {
            label: "Download Launcher",
            url: "https://thebustour.netlify.com/download",
        },
        {
            label: "Join Server",
            url: "https://discord.gg/drNgR29VrC",
        },
    ],
    timestamps: { start: Date.now() },
    instance: true,
};
