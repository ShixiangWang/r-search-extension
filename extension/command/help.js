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
            `Prefix '${c.match("?cmd ")}' to search command (e.g. sed) on https://tldr.ostera.io/`,
            `Prefix '${c.match("?bio ")}' to search questions on on Biostars`,
            `Prefix '${c.match("/")}' to search 微信公众号, '${c.match("/cmd ")}' to search Linux命令, '${c.match("/zh ")}' to search 知乎, '${c.match("/sf ")}' to search 思否`,
        ];
        return this.wrap(value);
    }
}