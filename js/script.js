(function () {
  var config = window.SITE_CONFIG || {};
  var showCountdown = config.showCountdown ?? true;
  var launchDate = config.launchDate ?? "2026-09-15T00:00:00";
  var discordUrl = config.discordUrl ?? "https://discord.gg/runeith";
  var speedMultiplier = config.speedMultiplier ?? 1;

  var METAL_GRADIENTS = {
    bronze: "linear-gradient(160deg,#e3a463,#8a5a2b)",
    iron: "linear-gradient(160deg,#9aa0a6,#4d5257)",
    steel: "linear-gradient(160deg,#e9edf0,#8b939b)",
    black: "linear-gradient(160deg,#5a5a5a,#181818)",
    mithril: "linear-gradient(160deg,#7ea7e0,#2f4f8a)",
    adamant: "linear-gradient(160deg,#6fcf8e,#1f6b3a)",
    rune: "linear-gradient(160deg,#c7edf5,#4fa9bd)",
    dragon: "linear-gradient(160deg,#e2554a,#7a1210)"
  };
  var METAL_ORDER = ["bronze", "iron", "steel", "black", "mithril", "adamant", "rune", "dragon"];

  var ITEM_DEFS = [
    { left: "6%", top: "18%", size: 40, dur: 6.5, delay: 0, type: "sword" },
    { left: "88%", top: "14%", size: 46, dur: 7.2, delay: 0.4, type: "kite" },
    { left: "4%", top: "46%", size: 58, dur: 8, delay: 0.8, type: "sword" },
    { left: "91%", top: "40%", size: 48, dur: 6.8, delay: 1.1, type: "kite" },
    { left: "10%", top: "70%", size: 46, dur: 7.6, delay: 0.2, type: "kite" },
    { left: "86%", top: "68%", size: 42, dur: 7, delay: 0.6, type: "sword" },
    { left: "15%", top: "30%", size: 40, dur: 6.2, delay: 1.4, type: "sword" },
    { left: "80%", top: "24%", size: 46, dur: 7.8, delay: 0.9, type: "kite" },
    { left: "3%", top: "58%", size: 44, dur: 6.6, delay: 1.6, type: "kite" },
    { left: "94%", top: "56%", size: 40, dur: 7.4, delay: 0.3, type: "sword" },
    { left: "20%", top: "6%", size: 36, dur: 7.1, delay: 1.2, type: "sword" },
    { left: "72%", top: "4%", size: 42, dur: 6.4, delay: 0.5, type: "kite" },
    { left: "2%", top: "32%", size: 38, dur: 7.9, delay: 1.8, type: "kite" },
    { left: "97%", top: "26%", size: 40, dur: 6.9, delay: 0.9, type: "sword" },
    { left: "28%", top: "82%", size: 44, dur: 7.3, delay: 0.2, type: "kite" },
    { left: "68%", top: "84%", size: 40, dur: 6.7, delay: 1.5, type: "sword" },
    { left: "12%", top: "88%", size: 38, dur: 7.6, delay: 0.7, type: "sword" },
    { left: "82%", top: "88%", size: 42, dur: 6.3, delay: 1.1, type: "kite" },
    { left: "36%", top: "4%", size: 34, dur: 7.4, delay: 1.6, type: "kite" },
    { left: "60%", top: "6%", size: 34, dur: 6.6, delay: 0.3, type: "sword" }
  ].map(function (def, i) {
    return Object.assign({}, def, { metal: METAL_ORDER[i % METAL_ORDER.length] });
  });

  var SWORD_CLIP = "polygon(50% 0%,62% 10%,62% 68%,82% 68%,82% 78%,60% 78%,60% 100%,40% 100%,40% 78%,18% 78%,18% 68%,38% 68%,38% 10%)";
  var KITE_CLIP = "polygon(50% 0%,80% 4%,100% 22%,94% 55%,78% 82%,50% 100%,22% 82%,6% 55%,0% 22%,20% 4%)";

  function clipFor(def) {
    return def.type === "kite" ? KITE_CLIP : SWORD_CLIP;
  }

  function renderFloatingItems() {
    var container = document.getElementById("floating-items");
    if (!container) return;

    var itemCount = Math.max(1, Math.min(ITEM_DEFS.length, Math.round(config.itemCount ?? ITEM_DEFS.length)));
    var defs = ITEM_DEFS.slice(0, itemCount);

    defs.forEach(function (def, i) {
      var wrap = document.createElement("div");
      wrap.className = "floating-item";
      wrap.style.left = def.left;
      wrap.style.top = def.top;
      wrap.style.width = def.size + "px";
      wrap.style.height = def.size + "px";
      wrap.style.opacity = "1";

      var floater = document.createElement("div");
      floater.className = "floating-item-spin";
      floater.style.animationDuration = (def.dur / speedMultiplier) + "s";
      floater.style.animationDelay = def.delay + "s";

      var shape = document.createElement("div");
      shape.className = "floating-item-shape" + (def.type === "kite" ? " kite" : "");
      shape.style.clipPath = clipFor(def);
      shape.style.background = METAL_GRADIENTS[def.metal];
      shape.style.animationDuration = ((8 + (def.size % 5)) / speedMultiplier) + "s";
      shape.style.animationDelay = def.delay + "s";

      floater.appendChild(shape);
      wrap.appendChild(floater);
      container.appendChild(wrap);

      scheduleTeleport(wrap, 6000 + i * 1400);
    });
  }

  function scheduleTeleport(wrap, initialWait) {
    var wait = (initialWait ?? (18000 + Math.random() * 16000)) / speedMultiplier;
    setTimeout(function () {
      wrap.style.opacity = "0";
      setTimeout(function () {
        var left = (Math.random() * 82 + 4).toFixed(1) + "%";
        var top = (Math.random() * 74 + 6).toFixed(1) + "%";
        wrap.style.left = left;
        wrap.style.top = top;
        wrap.style.opacity = "1";
        scheduleTeleport(wrap);
      }, 1400 / speedMultiplier);
    }, wait);
  }

  function renderCountdown() {
    var block = document.getElementById("countdown");
    if (!block) return;
    if (!showCountdown) {
      block.style.display = "none";
      return;
    }

    var target = new Date(launchDate).getTime();
    var elDays = document.getElementById("cd-days");
    var elHours = document.getElementById("cd-hours");
    var elMins = document.getElementById("cd-mins");
    var elSecs = document.getElementById("cd-secs");

    function tick() {
      var diff = Math.max(0, target - Date.now());
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      elDays.textContent = String(days).padStart(2, "0");
      elHours.textContent = String(hours).padStart(2, "0");
      elMins.textContent = String(mins).padStart(2, "0");
      elSecs.textContent = String(secs).padStart(2, "0");
    }

    tick();
    setInterval(tick, 1000);
  }

  function renderDiscordLink() {
    var link = document.getElementById("discord-link");
    if (link) link.href = discordUrl;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCountdown();
    renderDiscordLink();
    renderFloatingItems();
  });
})();
