const c = new Compat();
const commandManager = new CommandManager(
    new HelpCommand(),
    new HistoryCommand(),
);

const defaultSuggestion = `Search R docs and packages in your address bar!`;
const omnibox = new Omnibox(defaultSuggestion, 1000);

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
            description: `Search docs/packages '${c.match(query)}' on https://rdrr.io/`,
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
            description: `Search package '${query.substr(1)}' on https://rdrr.io/`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?all:", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        return [{
            content: `https://stackoverflow.com/search?q=${query.substr(5)}`,
            description: `Search '${query.substr(5)}' on Stack Overflow all QAs`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?", {
    defaultSearch: true,
    searchPriority: 3,
    onSearch: (query) => {
        return [{
            content: `https://stackoverflow.com/search?q=%5Br%5D ${query.substr(1)}`,
            description: `Search '${query.substr(1)}' on Stack Overflow r tagged QAs`,
        }]
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("/", {
    defaultSearch: true,
    searchPriority: 3,
    onSearch: (query) => {
        return [{
            content: `https://weixin.sogou.com/weixin?type=2&query=${query.substr(1)}`,
            description: `Search '${query.substr(1)}' related posts on Wechat platform`,
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