function Compat() {
    // Firefox doesn't support tags in search suggestion.
    this.tagged = this.browserType() !== "firefox" ?
        (tag, str) => `<${tag}>${str}</${tag}>` :
        (_, str) => str;
    this.match = (str) => this.tagged("match", str);
    this.dim = (str) => this.tagged("dim", str);
}

Compat.prototype.browserType = function() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("firefox") !== -1) return "firefox";
    if (userAgent.indexOf("edg") !== -1) return "edge";
    if (userAgent.indexOf("chrome") !== -1) return "chrome";
    return "unknown";
};

Compat.prototype.omniboxPageSize = function() {
    return {"firefox": 6, "edge": 8, "chrome": 8, "unknown": 8}[this.browserType()];
};

// Escape the five predefined entities to display them as text.
Compat.prototype.escape = function(str) {
    str = str || "";
    return this.browserType() !== "firefox" ? str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
        : str;
};

// Compatibly get extension's background page.
Compat.prototype.getBackgroundPage = function() {
    return chrome.extension.getBackgroundPage();
};

Compat.prototype.normalizeDate = function(date) {
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join('-');
};

Compat.prototype.capitalize = function(value) {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return "";
}
