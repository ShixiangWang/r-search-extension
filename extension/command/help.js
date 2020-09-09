class HelpCommand extends Command {
    constructor() {
        super("help", "Show the help messages.");
    }

    onExecute(arg) {
        const value = [
            `Prefix '${c.match(":")}' to execute command (:help, etc)`,
            `Prefix '${c.match("!")}' to search packages exclusively`,
            `Prefix '${c.match("?")}' to search questions on Stack Overflow with r tag`,
            `Prefix '${c.match("?all ")}' to search questions on Stack Overflow without tag`,
            `Prefix '${c.match("?cmd ")}' to search questions on https://tldr.ostera.io/`,
            `Prefix '${c.match("?bio ")}' to search questions on on Biostars`,
            `Prefix '${c.match("/")}' to search posts on 微信公众号 (China)`,
            `Prefix '${c.match("/zh ")}' to search questions on 知乎 (China)`,
            `Prefix '${c.match("/sf ")}' to search questions on 思否 (China)`,
        ];
        return this.wrap(value);
    }
}