class HelpCommand extends Command {
    constructor() {
        super("help", "Show the help messages.");
    }

    onExecute(arg) {
        const value = [
            `Prefix ${c.match(":")} to execute command (:help, etc)`,
            `Prefix ${c.match("!")} to search packages exclusively`,
            `Prefix ${c.match("?")} to search questions on Stack Overflow with r tag`,
            `Prefix ${c.match("?all:")} to search questions on Stack Overflow without tag`,
            `Prefix ${c.match("/")} to search posts on WeChat platform`,
        ];
        return this.wrap(value);
    }
}