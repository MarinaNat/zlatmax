(() => {
  "use strict";
  const t = {};
  let e = (t, e = 500, s = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = s ? `${s}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !s),
            !s && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !s && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: t } })
            );
        }, e));
    },
    s = (t, e = 500, s = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          s && t.style.removeProperty("height");
        let o = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = s ? `${s}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = o + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: t } })
              );
          }, e);
      }
    },
    o = !0,
    n = (t = 500) => {
      document.documentElement.classList.contains("lock") ? i(t) : r(t);
    },
    i = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < s.length; t++) {
            s[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    },
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (o) {
        let s = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < s.length; t++) {
          s[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (o = !1),
          setTimeout(function () {
            o = !0;
          }, t);
      }
    };
  function a(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function l(t, e) {
    const s = Array.from(t).filter(function (t, s, o) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (s.length) {
      const t = [];
      s.forEach((s) => {
        const o = {},
          n = s.dataset[e].split(",");
        (o.value = n[0]),
          (o.type = n[1] ? n[1].trim() : "max"),
          (o.item = s),
          t.push(o);
      });
      let o = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      o = (function (t) {
        return t.filter(function (t, e, s) {
          return s.indexOf(t) === e;
        });
      })(o);
      const n = [];
      if (o.length)
        return (
          o.forEach((e) => {
            const s = e.split(","),
              o = s[1],
              i = s[2],
              r = window.matchMedia(s[0]),
              a = t.filter(function (t) {
                if (t.value === o && t.type === i) return !0;
              });
            n.push({ itemsArray: a, matchMedia: r });
          }),
          n
        );
    }
  }
  t.popup = new (class {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${s}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : n(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          o &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            n(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(e),
        o = s.indexOf(document.activeElement);
      t.shiftKey && 0 === o && (s[s.length - 1].focus(), t.preventDefault()),
        t.shiftKey || o !== s.length - 1 || (s[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && a(`[Попапос]: ${t}`);
    }
  })({});
  t.mousePrlx = new (class {
    constructor(t, e = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
        this.config.init)
      ) {
        const t = document.querySelectorAll("[data-prlx-mouse]");
        t.length
          ? (this.paralaxMouseInit(t),
            this.setLogging(`Проснулся, слежу за объектами: (${t.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(t) {
      t.forEach((t) => {
        const e = t.closest("[data-prlx-mouse-wrapper]"),
          s = t.dataset.prlxCx ? +t.dataset.prlxCx : 100,
          o = t.dataset.prlxCy ? +t.dataset.prlxCy : 100,
          n = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
          i = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
          r = t.dataset.prlxA ? +t.dataset.prlxA : 50;
        let a = 0,
          l = 0,
          c = 0,
          p = 0;
        function u(e = window) {
          e.addEventListener("mousemove", function (e) {
            const s = t.getBoundingClientRect().top + window.scrollY;
            if (s >= window.scrollY || s + t.offsetHeight >= window.scrollY) {
              const t = window.innerWidth,
                s = window.innerHeight,
                o = e.clientX - t / 2,
                n = e.clientY - s / 2;
              (c = (o / t) * 100), (p = (n / s) * 100);
            }
          });
        }
        !(function e() {
          (a += ((c - a) * r) / 1e3),
            (l += ((p - l) * r) / 1e3),
            (t.style.cssText = `transform: translate3D(${(n * a) / (s / 10)}%,${
              (i * l) / (o / 10)
            }%,0);`),
            requestAnimationFrame(e);
        })(),
          e ? u(e) : u();
      });
    }
    setLogging(t) {
      this.config.logging && a(`[PRLX Mouse]: ${t}`);
    }
  })({});
  function c(t) {
    this.type = t;
  }
  (c.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        s = e.dataset.da.trim().split(","),
        o = {};
      (o.element = e),
        (o.parent = e.parentNode),
        (o.destination = document.querySelector(s[0].trim())),
        (o.breakpoint = s[1] ? s[1].trim() : "767"),
        (o.place = s[2] ? s[2].trim() : "last"),
        (o.index = this.indexInParent(o.parent, o.element)),
        this.оbjects.push(o);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, s) {
          return Array.prototype.indexOf.call(s, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const s = this.mediaQueries[e],
        o = String.prototype.split.call(s, ","),
        n = window.matchMedia(o[0]),
        i = o[1],
        r = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === i;
        });
      n.addListener(function () {
        t.mediaHandler(n, r);
      }),
        this.mediaHandler(n, r);
    }
  }),
    (c.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const s = e[t];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const s = e[t];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (c.prototype.moveTo = function (t, e, s) {
      e.classList.add(this.daClassname),
        "last" === t || t >= s.children.length
          ? s.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? s.children[t].insertAdjacentElement("beforebegin", e)
          : s.insertAdjacentElement("afterbegin", e);
    }),
    (c.prototype.moveBack = function (t, e, s) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[s]
          ? t.children[s].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (c.prototype.indexInParent = function (t, e) {
      const s = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(s, e);
    }),
    (c.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new c("max").init(),
    document.addEventListener("click", function (t) {
      const e = t.target;
      if (e.closest("[data-parent]")) {
        const s = e.dataset.parent ? e.dataset.parent : null,
          o = document.querySelector(`[data-submenu="${s}"]`);
        document.querySelector(".catalog-header");
        if (o) {
          const t = document.querySelector("._sub-menu-active"),
            s = document.querySelector("._sub-menu-open");
          t &&
            t !== e &&
            (t.classList.remove("_sub-menu-active"),
            s.classList.remove("_sub-menu-open")),
            e.classList.toggle("_sub-menu-active"),
            o.classList.toggle("_sub-menu-open");
        } else console.log("Ой ой, нет такого подменю :(");
        t.preventDefault();
      }
    });
  const p = document.querySelectorAll(".sub-menu-catalog__block");
  p.length &&
    p.forEach((t) => {
      const e = t.querySelectorAll(".sub-menu-catalog__category").length;
      t.classList.add(`sub-menu-catalog__block_${e}`);
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          o &&
            (n(),
            document.documentElement.classList.toggle("menu-open"),
            document.documentElement.classList.contains("catalog-open") &&
              document.documentElement.classList.remove("catalog-open"),
            document.documentElement.classList.contains("sub-menu-open") &&
              document.documentElement.classList.remove("sub-menu-open"));
        });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-spollers]");
      if (t.length > 0) {
        const o = Array.from(t).filter(function (t, e, s) {
          return !t.dataset.spollers.split(",")[0];
        });
        o.length && i(o);
        let n = l(t, "spollers");
        function i(t, e = !1) {
          t.forEach((t) => {
            (t = e ? t.item : t),
              e.matches || !e
                ? (t.classList.add("_spoller-init"),
                  r(t),
                  t.addEventListener("click", a))
                : (t.classList.remove("_spoller-init"),
                  r(t, !1),
                  t.removeEventListener("click", a));
          });
        }
        function r(t, e = !0) {
          let s = t.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (e) => e.closest("[data-spollers]") === t
            )),
            s.forEach((t) => {
              e
                ? (t.removeAttribute("tabindex"),
                  t.classList.contains("_spoller-active") ||
                    (t.nextElementSibling.hidden = !0))
                : (t.setAttribute("tabindex", "-1"),
                  (t.nextElementSibling.hidden = !1));
            }));
        }
        function a(t) {
          const o = t.target;
          if (o.closest("[data-spoller]")) {
            const n = o.closest("[data-spoller]"),
              i = n.closest("[data-spollers]"),
              r = !!i.hasAttribute("data-one-spoller");
            i.querySelectorAll("._slide").length ||
              (r && !n.classList.contains("_spoller-active") && c(i),
              n.classList.toggle("_spoller-active"),
              ((t, o = 500) => {
                t.hidden ? s(t, o) : e(t, o);
              })(n.nextElementSibling, 500)),
              t.preventDefault();
          }
        }
        function c(t) {
          const s = t.querySelector("[data-spoller]._spoller-active");
          s &&
            (s.classList.remove("_spoller-active"),
            e(s.nextElementSibling, 500));
        }
        n &&
          n.length &&
          n.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              i(t.itemsArray, t.matchMedia);
            }),
              i(t.itemsArray, t.matchMedia);
          });
      }
    })();
})();
