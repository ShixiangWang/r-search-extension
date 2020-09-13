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
            description: `Search docs/packages '${c.match(query)}' on https://rdrr.io/`,
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
        if (query.substr(0, 1) == "!") {
            return [{
                content: `https://rdrr.io/find/?repos=cran%2Cbioc%2Crforge%2Cgithub&fuzzy_slug=${query.substr(1)}`,
                description: `Search package '${query.substr(1)}' on https://rdrr.io/`,
            }]
        } else {
            return [{
                content: `https://rdrr.io/find/?repos=cran%2Cbioc%2Crforge%2Cgithub&fuzzy_slug=${query}`,
                description: `Search package '${query}' on https://rdrr.io/`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?all ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 5) == "?all ") {
            return [{
                content: `https://stackoverflow.com/search?q=${query.substr(5)}`,
                description: `Search '${query.substr(5)}' on Stack Overflow all QAs`,
            }]
        } else {
            return [{
                content: `https://stackoverflow.com/search?q=${query}`,
                description: `Search '${query}' on Stack Overflow all QAs`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?bio ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 5) == "?bio ") {
            return [{
                content: `https://www.biostars.org/local/search/page/?q=${query.substr(5)}`,
                description: `Search '${query.substr(5)}' on Biostars`,
            }]
        } else {
            return [{
                content: `https://www.biostars.org/local/search/page/?q=${query}`,
                description: `Search '${query}' on Biostars`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?cmd ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 5) == "?cmd ") {
            return [{
                content: `https://tldr.ostera.io/${query.substr(5)}`,
                description: `Search command '${query.substr(5)}' on https://tldr.ostera.io/`,
            }]
        } else {
            return [{
                content: `https://tldr.ostera.io/${query}`,
                description: `Search command '${query}' on https://tldr.ostera.io/`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("?", {
    defaultSearch: true,
    searchPriority: 3,
    onSearch: (query) => {
        if (query.substr(0, 1) == "?") {
            return [{
                content: `https://stackoverflow.com/search?q=%5Br%5D ${query.substr(1)}`,
                description: `Search '${query.substr(1)}' on Stack Overflow r tagged QAs`,
            }]
        } else {
            return [{
                content: `https://stackoverflow.com/search?q=%5Br%5D ${query}`,
                description: `Search '${query}' on Stack Overflow r tagged QAs`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("/cmd ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 5) == "/cmd ") {
            return [{
                content: `https://man.linuxde.net/?s=${query.substr(5)}`,
                description: `Search command '${query.substr(5)}' on Linux命令大全`,
            }]
        } else {
            return [{
                content: `https://man.linuxde.net/?s=${query}`,
                description: `Search command '${query}' on Linux命令大全`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("/zh ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 4) == "/zh ") {
            return [{
                content: `https://www.zhihu.com/search?type=content&q=${query.substr(4)}`,
                description: `Search '${query.substr(4)}' on 知乎`,
            }]
        } else {
            return [{
                content: `https://www.zhihu.com/search?type=content&q=${query}`,
                description: `Search '${query}' on 知乎`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("/sf ", {
    defaultSearch: true,
    searchPriority: 1,
    onSearch: (query) => {
        if (query.substr(0, 4) == "/sf ") {
            return [{
                content: `https://segmentfault.com/search?q=${query.substr(4)}`,
                description: `Search '${query.substr(4)}' on 思否`,
            }]
        } else {
            return [{
                content: `https://segmentfault.com/search?q=${query}`,
                description: `Search '${query}' on 思否`,
            }]
        }
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent("/", {
    defaultSearch: true,
    searchPriority: 3,
    onSearch: (query) => {
        if (query.substr(0, 1) == "/") {
            return [{
                content: `https://weixin.sogou.com/weixin?type=2&query=${query.substr(1)}`,
                description: `Search '${query.substr(1)}' related posts on 微信公众号`,
            }]
        } else {
            return [{
                content: `https://weixin.sogou.com/weixin?type=2&query=${query}`,
                description: `Search '${query}' related posts on 微信公众号`,
            }]
        }
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