class HelpCommand extends Command {
    constructor() {
        super("help", "Show the help messages.");
    }

    onExecute(arg) {
        const value = [
            `Prefix ${c.match(":")} to execute command (:help, etc)`,
            `Prefix ${c.match("!")} to search packages exclusively`,
        ];
        return this.wrap(value);
    }
}