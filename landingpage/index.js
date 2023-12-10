class TabManager {
    constructor(parentEl, json) {
        this.parentEl = parentEl;
        this.json = json;
        this.createTabs();
        this.setActiveTab(1); 
    }

    createTabs() {
        var tabBar = document.createElement("div");
        tabBar.className = "tab-bar";

        this.json.forEach((tab, index) => {
            var button = document.createElement("button");
            button.title = tab.title;
            button.type = "button";
            button.className = index === 0 ? "tab tab--active" : "tab";
            button.innerText = tab.title;

            button.addEventListener("click", (e) => this.selectTab(e, tab.callback, tab.params));

            tabBar.appendChild(button);
        });

        var tabUnderline = document.createElement("div");
        tabUnderline.className = "tab-underline";
        tabBar.appendChild(tabUnderline);

        this.parentEl.appendChild(tabBar);

        this.setActiveTab(1); 
    }

    setActiveTab(tabNum) {
        var activeTab = this.parentEl.querySelectorAll(".tab")[tabNum - 1];
        activeTab.classList.add("tab--active");
        this.json[tabNum - 1].callback();

        this.setTabAnimation(activeTab);
    }

    selectTab(e, callback, params) {
        var activeTab = this.parentEl.querySelector(".tab--active");
        activeTab.classList.remove("tab--active");

        var el = e.target;
        el.classList.add("tab--active");
        this.setTabAnimation(el);

        callback(params);
    }

    setTabAnimation(tab) {
        var tabBar = document.querySelector(".tab-bar");
        var underline = document.querySelector(".tab-underline");

        var left = Math.floor(tab.offsetLeft - tabBar.offsetLeft) + "px";
        underline.style.transform = "translateX(" + left + ")";
        underline.style.width = tab.offsetWidth + "px";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const parentElement = document.getElementById("tabParent");
    const tabsJson = [
        { title: "Sign In", callback: () => switchTab("loginSection"), params: null },
        { title: "Join In", callback: () => switchTab("signupSection"), params: null }
    ];

    const tabManager = new TabManager(parentElement, tabsJson);

    function switchTab(tabId) {
        const loginSection = document.getElementById("loginSection");
        const signupSection = document.getElementById("signupSection");

        if (tabId === "loginSection") {
            loginSection.style.display = "block";
            signupSection.style.display = "none";
        } else {
            signupSection.style.display = "block";
            loginSection.style.display = "none";
        }
    }
});
