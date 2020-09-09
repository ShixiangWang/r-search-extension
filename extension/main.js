const c = new Compat();
const commandManager = new CommandManager(
    new HelpCommand(),
    new HistoryCommand(),
);

const defaultSuggestion = `Search R docs and third packages in your address bar instantly!`;
const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());

omnibox.bootstrap({
    onSearch: (query) => {
        return [{
            content: `https://rdrr.io/search?q=${query}`,
            description: `Search docs/packages ${c.match(query)} on https://rdrr.io/`,
        }]
    },
    onAppend: (query) => {
        return [{
            content: `https://rdrr.io/search?q=${query}`,
            description: `Search docs/packages ${c.match(query)} on https://rdrr.io/`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("!", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        return [{
            content: `https://rdrr.io/find/?repos=cran%2Cbioc%2Crforge%2Cgithub&fuzzy_slug=${query.substr(1)}`,
            description: `Search packages ${query.substr(1)} on https://rdrr.io/`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?", {
    defaultSearch: true,
    searchPriority: 2,
    onSearch: (query) => {
        return [{
            content: `https://stackoverflow.com/search?q=%5Br%5D ${query.substr(1)}`,
            description: `Search question/answer ${query.substr(1)} on Stack Overflow`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

// join(["A","bb"]) == "A/bb"
// join(["A","bb",undefined]) == "A/bb"
// join(["A",undefined,undefined]) == "A"
// join(["A",undefined,"a"]) == "A/a"
function join(list) {
    // Use filter() method to filter out falsy item.
    let result = (list || []).filter(_ => _).join("/");
    if (result.endsWith("/")) {
        result = result.slice(0, result.length);
    }
    return result;
}

omnibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return commandManager.execute(query);
    }
});

omnibox.addNoCacheQueries(":");