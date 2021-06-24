"use strict";
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    (i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      "value" in i && (i.writable = !0),
      Object.defineProperty(e, i.key, i);
  }
}
function _createClass(e, t, n) {
  return (
    t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
  );
}
self.PUSHOWL_SERVICE_WORKER_VERSION = "2.0";
var ErrorHelper = (function () {
  function e(e) {
    (e = e || {}),
      (e.poServiceWorkerVersion = self.PUSHOWL_SERVICE_WORKER_VERSION);
    var t = new Date().toISOString().split(".")[0];
    return {
      event_id: (function () {
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
          }
        );
      })(),
      logger: "cdn-service-worker",
      platform: "javascript",
      timestamp: t,
      extra: e,
      release: "914a8d5",
    };
  }
  function t(e) {
    return fetch(o, {
      method: "post",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
  }
  function n(e) {
    var t = e.stack || "",
      n = t.split("\n").map(function (e) {
        return e.trim();
      }),
      i = n.filter(function (e) {
        return e.startsWith("at");
      }),
      r = i.map(function (e) {
        var t = "",
          n = 0,
          i = 0,
          r = "",
          a = e.split(/[ ]+/);
        if ("at" === a[0].trim() && a.length > 1) {
          var o = "";
          a.length > 2 ? ((t = a[1]), (o = a[2])) : (o = a[1]),
            (o = o.replace("(", "").replace(")", ""));
          var c = o.split(":");
          c.length > 1 &&
            ((n = c[c.length - 1]),
            (i = c[c.length - 2]),
            (r = c.slice(0, c.length - 2).join(":")));
        }
        return {
          in_app: !0,
          function: t,
          colno: Number(n) || n,
          lineno: Number(i) || i,
          filename: r,
        };
      });
    return (
      r.reverse(),
      {
        values: [
          {
            type: e.name || "Error",
            value: e.message || String(e),
            stacktrace: { frames: r },
          },
        ],
      }
    );
  }
  function i(n, i) {
    var r = e(i);
    return (r.message = n), t(r);
  }
  function r(i, r) {
    (r = r || {}), (r.errorDump = { str: String(i), stack: i && i.stack });
    var a = e(r);
    return (a.exception = n(i)), t(a);
  }
  function a(e) {
    function t(t) {
      if (!t || !t.waitUntil)
        throw new Error(
          "withErrorReporting should only be used for handlers that receive ExtendableEvent"
        );
      try {
        return e(t);
      } catch (e) {
        var n = r(e, { eventData: t && t.data && t.data.json() });
        t.waitUntil(n);
      }
    }
    return t;
  }
  var o =
    "https://sentry.io/api/1891871/store/?sentry_version=7&sentry_key=0df575aa94e3419782416c33a46d9dd7";
  return { log: i, logException: r, withErrorReporting: a };
})();
!(function () {
  function e(e) {
    if (self.Notification && "granted" === self.Notification.permission) {
      if (!e.data) throw new Error("Empty event data.");
      var t = i.processPush(e);
      e.waitUntil(t);
    }
  }
  var t = console,
    n = (function () {
      function e() {
        _classCallCheck(this, e);
      }
      return (
        _createClass(
          e,
          [
            {
              key: "payloadTransformation",
              value: function (e) {
                var t = e.title,
                  n = [],
                  i = e.actions;
                if (i)
                  for (var r = 0; r < i.length; r++) {
                    var a = { action: "action" + r, title: i[r].title };
                    n.push(a);
                  }
                var o = !("require_interaction" in e) || e.require_interaction,
                  c = {
                    body: e.description || "",
                    tag: e.tag || e.id,
                    actions: n,
                    requireInteraction: o,
                    data: e,
                  };
                return (
                  ["icon", "badge", "image"].forEach(function (t) {
                    e[t] && (c[t] = e[t]);
                  }),
                  { title: t, config: c }
                );
              },
            },
            {
              key: "processPush",
              value: function (e) {
                if (
                  ((this.payload = e.data.json().data),
                  !this.payload || "pushowl" !== this.payload.app)
                )
                  return Promise.resolve();
                var t = this.payloadTransformation(this.payload),
                  n = t.title,
                  i = t.config,
                  r = this.displayNotification(n, i),
                  a = this.payload.delivery_acknowledgement_url,
                  o = this.update(a);
                return Promise.all([o, r]);
              },
            },
            {
              key: "displayNotification",
              value: function (e, t) {
                return self.registration.showNotification(e, t);
              },
            },
            {
              key: "update",
              value: function (t) {
                var n = { version: e.version };
                return fetch(t, {
                  method: "POST",
                  body: JSON.stringify(n),
                  headers: { "Content-Type": "application/json" },
                });
              },
            },
            {
              key: "openLink",
              value: function (e) {
                e &&
                  clients.matchAll({ type: "window" }).then(function (t) {
                    for (var n = 0; n < t.length; n++) {
                      var i = t[n];
                      if (i.url === e && "focus" in i) return i.focus();
                    }
                    if (clients.openWindow) return clients.openWindow(e);
                  });
              },
            },
          ],
          [
            {
              key: "version",
              get: function () {
                return self.PUSHOWL_SERVICE_WORKER_VERSION;
              },
            },
          ]
        ),
        e
      );
    })(),
    i = new n();
  self.addEventListener("install", function (e) {
    e.waitUntil(self.skipWaiting());
  }),
    self.addEventListener("activate", function (e) {
      e.waitUntil(self.clients.claim());
    }),
    self.addEventListener("push", ErrorHelper.withErrorReporting(e)),
    self.addEventListener("notificationclick", function (e) {
      var t = e.notification.data,
        n = t.redirect_url,
        r = t.click_acknowledgement_url,
        a = "body";
      e.action &&
        (e.action.includes("action0")
          ? ((n = t.actions[0].redirect_url), (a = "cta1"))
          : e.action.includes("action1") &&
            ((n = t.actions[1].redirect_url), (a = "cta2")));
      var o = new Promise(function (t, r) {
        e.notification.close(), i.openLink(n), t();
      });
      r += "&clicked_component=" + a;
      var c = Promise.all([o, i.update(r)]);
      e.waitUntil(c);
    }),
    self.addEventListener("message", function (e) {
      var t = i.payloadTransformation(e.data),
        n = t.title,
        r = t.config;
      n && e.waitUntil(i.displayNotification(n, r));
    }),
    self.addEventListener("notificationclose", function (e) {
      e.waitUntil(
        new Promise(function (t, n) {
          var r = e.notification,
            a = r.data,
            o = a.close_acknowledgement_url;
          i.update(o)
            .then(function () {
              t();
            })
            .catch(function () {});
        })
      );
    }),
    self.addEventListener("error", function (e) {
      ErrorHelper.logException(e.error),
        t.error(e.filename, e.lineno, e.colno, e.message);
    });
})();
