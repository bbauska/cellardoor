/*! snowflakes | from © 2024 Denis Seleznev | https://github.com/bbauska/cellardoor/js/ */
!(function () {
    "use strict";
    var t = {
        color: "#5ECDEF",
        container: document.body,
        count: 50,
        speed: 1,
        stop: !1,
        rotation: !0,
        minOpacity: 0.6,
        maxOpacity: 1,
        minSize: 10,
        maxSize: 25,
        types: 6,
        width: void 0,
        height: void 0,
        wind: !0,
        zIndex: 9999,
        autoResize: !0,
    };
    function e(t, e) {
        Object.keys(e).forEach(function (a) {
            t.style[a] = e[a];
        });
    }
    function a(t) {
        e(t, { display: "block" });
    }
    function n(t) {
        e(t, { display: "none" });
    }
    function i(t) {
        t && t.parentNode && t.parentNode.removeChild(t);
    }
    function l(t) {
        return "string" == typeof t && "" !== t;
    }
    function o(t) {
        for (var e, a = [], n = 1; n < arguments.length; n++) a[n - 1] = arguments[n];
        var i = a.filter(l);
        i.length && (e = t.classList).add.apply(e, i);
    }
    function s(t) {
        for (var e, a = [], n = 1; n < arguments.length; n++) a[n - 1] = arguments[n];
        var i = a.filter(l);
        i.length && (e = t.classList).remove.apply(e, i);
    }
    function r(t, e) {
        return t + Math.floor(Math.random() * (e - t));
    }
    function h(t, e, a, n, i) {
        return n + ((i - n) * (t - e)) / (a - e);
    }
    function c(t, e, a) {
        return Math.floor(h(t, 0, 20, e, a));
    }
    var m = (function () {
        function t(t) {
            var i = this;
            (this.size = 0),
                (this.sizeInner = 0),
                (this.handleAnimationEnd = function (t) {
                    var l,
                        o = i.elem;
                    o && t.target === o && (e(o, { left: i.getLeft() }), n((l = o)), l.offsetHeight, a(l));
                });
            var l = (this.elem = document.createElement("div")),
                s = (this.elemInner = document.createElement("div"));
            this.update(t),
                o(l, "snowflake"),
                o(s, "snowflake__inner", t.types ? "snowflake__inner_type_" + r(0, t.types) : "", t.wind ? "snowflake__inner_wind" : "", t.rotation ? "snowflake__inner_rotation" + (Math.random() > 0.5 ? "" : "_reverse") : ""),
                l.appendChild(s),
                (l.onanimationend = this.handleAnimationEnd);
        }
        return (
            (t.prototype.getLeft = function () {
                return 99 * Math.random() + "%";
            }),
            (t.prototype.update = function (t) {
                if (this.elem && this.elemInner) {
                    var a = t.minSize === t.maxSize;
                    (this.sizeInner = a ? 0 : r(0, 20)), (this.size = c(this.sizeInner, t.minSize, t.maxSize));
                    var n = this.getAnimationProps(t),
                        i = {
                            animationName: "snowflake_gid_".concat(t.gid, "_y"),
                            animationDelay: n.animationDelay,
                            animationDuration: n.animationDuration,
                            left: this.getLeft(),
                            top: -Math.sqrt(2) * this.size + "px",
                            width: this.size + "px",
                            height: this.size + "px",
                        };
                    a || (i.opacity = String(h(this.size, t.minSize, t.maxSize, t.minOpacity, t.maxOpacity))), e(this.elem, i);
                    var l = "snowflake_gid_".concat(t.gid, "_x_").concat(this.sizeInner);
                    e(this.elemInner, { animationName: l, animationDelay: 4 * Math.random() + "s" });
                }
            }),
            (t.prototype.resize = function (t) {
                if (this.elem) {
                    var a = this.getAnimationProps(t);
                    e(this.elem, { animationDuration: a.animationDuration });
                }
            }),
            (t.prototype.appendTo = function (t) {
                this.elem && t.appendChild(this.elem);
            }),
            (t.prototype.destroy = function () {
                this.elem && ((this.elem.onanimationend = null), delete this.elem, delete this.elemInner);
            }),
            (t.prototype.getAnimationProps = function (t) {
                var e = t.containerHeight / 50 / t.speed,
                    a = e / 3;
                return { animationDelay: Math.random() * e + "s", animationDuration: String(h(this.size, t.minSize, t.maxSize, e, a) + "s") };
            }),
            t
        );
    })();
    new ((function () {
        function l(t) {
            var e = this;
            (this.destroyed = !1),
                (this.flakes = []),
                (this.handleResize = function () {
                    e.params.autoResize && e.resize();
                }),
                (this.handleOrientationChange = function () {
                    e.resize();
                }),
                (this.params = this.setParams(t)),
                l.gid++,
                (this.gid = l.gid),
                (this.container = this.appendContainer()),
                this.params.stop && this.stop(),
                this.appendStyles(),
                this.appendFlakes(),
                (this.containerSize = { width: this.width(), height: this.height() }),
                window.addEventListener("resize", this.handleResize, !1),
                screen.orientation && screen.orientation.addEventListener && screen.orientation.addEventListener("change", this.handleOrientationChange);
        }
        return (
            (l.hasSupport = function () {
                return Boolean("onanimationend" in document);
            }),
            (l.prototype.start = function () {
                s(this.container, "snowflakes_paused");
            }),
            (l.prototype.stop = function () {
                o(this.container, "snowflakes_paused");
            }),
            (l.prototype.show = function () {
                s(this.container, "snowflakes_hidden");
            }),
            (l.prototype.hide = function () {
                o(this.container, "snowflakes_hidden");
            }),
            (l.prototype.resize = function () {
                var t = this.width(),
                    e = this.height();
                if (e !== this.containerSize.height) {
                    (this.containerSize.width = t), (this.containerSize.height = e);
                    var i = this.getFlakeParams();
                    this.flakes.forEach(function (t) {
                        return t.resize(i);
                    }),
                        this.isBody() || (n(this.container), this.updateAnimationStyle(), a(this.container));
                }
            }),
            (l.prototype.destroy = function () {
                this.destroyed ||
                    ((this.destroyed = !0),
                    l.instanceCounter && l.instanceCounter--,
                    this.removeStyles(),
                    i(this.container),
                    this.flakes.forEach(function (t) {
                        return t.destroy();
                    }),
                    (this.flakes = []),
                    window.removeEventListener("resize", this.handleResize, !1),
                    screen.orientation && screen.orientation.removeEventListener && screen.orientation.removeEventListener("change", this.handleOrientationChange, !1));
            }),
            (l.prototype.isBody = function () {
                return this.params.container === document.body;
            }),
            (l.prototype.appendContainer = function () {
                var t = document.createElement("div");
                return o(t, "snowflakes", "snowflakes_gid_".concat(this.gid), this.isBody() ? "snowflakes_body" : ""), e(t, { zIndex: String(this.params.zIndex) }), this.params.container.appendChild(t), t;
            }),
            (l.prototype.appendStyles = function () {
                l.instanceCounter ||
                    (this.mainStyleNode = this.injectStyle(
                        '.snowflake{animation:snowflake_unknown 10s linear;pointer-events:none;position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;will-change:transform}.snowflake__inner,.snowflake__inner:before{bottom:0;left:0;position:absolute;right:0;top:0}.snowflake__inner:before{background-size:100% 100%;content:""}.snowflake__inner_wind{animation:snowflake_unknown 2s ease-in-out infinite alternate}.snowflake__inner_rotation:before{animation:snowflake_rotation 10s linear infinite}.snowflake__inner_rotation_reverse:before{animation:snowflake_rotation_reverse 10s linear infinite}@keyframes snowflake_rotation{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes snowflake_rotation_reverse{0%{transform:rotate(0deg)}to{transform:rotate(-1turn)}}.snowflakes{pointer-events:none}.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{animation-play-state:paused}.snowflakes_hidden{visibility:hidden}.snowflakes_body{height:1px;left:0;position:fixed;top:0;width:100%}'
                    )),
                    l.instanceCounter++,
                    (this.imagesStyleNode = this.injectStyle(
                        ".snowflakes_gid_value .snowflake__inner_type_0:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36.283' height='36.283'%3E%3Cpath d='M35.531 17.391h-3.09l.845-1.464a.748.748 0 1 0-1.297-.75l-1.276 2.214H28.61l2.515-4.354a.751.751 0 0 0-.272-1.024.75.75 0 0 0-1.024.274l-2.948 5.104h-2.023a6.751 6.751 0 0 0-2.713-4.684l1.019-1.76 5.896-.002a.75.75 0 0 0 0-1.5l-5.029.002 1.051-1.82 2.557.002a.75.75 0 0 0 0-1.5l-1.689-.002 1.545-2.676a.75.75 0 1 0-1.302-.75l-1.547 2.676-.844-1.463a.749.749 0 1 0-1.297.75l1.278 2.213-1.051 1.818-2.514-4.354a.75.75 0 0 0-1.298.75l2.946 5.104-1.016 1.758a6.692 6.692 0 0 0-2.706-.57 6.74 6.74 0 0 0-2.707.568l-1.013-1.754 2.946-5.105a.75.75 0 0 0-1.298-.75L13.56 8.697l-1.05-1.818 1.278-2.217a.749.749 0 0 0-1.298-.75l-.845 1.465-1.551-2.678a.75.75 0 0 0-1.024-.273.748.748 0 0 0-.274 1.023l1.545 2.678H8.652a.75.75 0 0 0 0 1.5h2.556l1.05 1.818H7.231a.75.75 0 0 0 0 1.5h5.894l1.017 1.762a6.755 6.755 0 0 0-2.712 4.684H9.406l-2.95-5.104a.75.75 0 1 0-1.299.75l2.516 4.354H5.569l-1.277-2.213a.75.75 0 0 0-1.298.75l.845 1.463H.75a.75.75 0 0 0 0 1.5h3.09l-.845 1.465a.747.747 0 0 0 .275 1.022.75.75 0 0 0 .374.103.75.75 0 0 0 .65-.375l1.277-2.215h2.103l-2.516 4.354a.75.75 0 0 0 1.299.75l2.949-5.104h2.024a6.761 6.761 0 0 0 2.712 4.685l-1.017 1.762H7.232a.75.75 0 0 0 0 1.5h5.026l-1.05 1.818H8.651a.75.75 0 0 0 0 1.5h1.69l-1.545 2.676a.75.75 0 0 0 1.299.75l1.546-2.676.846 1.465a.755.755 0 0 0 .65.375.737.737 0 0 0 .375-.103.747.747 0 0 0 .274-1.022l-1.279-2.215 1.05-1.82 2.515 4.354a.75.75 0 0 0 1.299-.75l-2.947-5.104 1.013-1.756a6.72 6.72 0 0 0 5.415 0l1.014 1.756-2.947 5.104a.75.75 0 0 0 1.298.75l2.515-4.354 1.053 1.82-1.277 2.213a.75.75 0 0 0 1.298.75l.844-1.463 1.545 2.678c.141.24.393.375.65.375a.75.75 0 0 0 .649-1.125l-1.548-2.678h1.689a.75.75 0 0 0 0-1.5h-2.557l-1.051-1.82 5.029.002a.75.75 0 0 0 0-1.5l-5.896-.002-1.019-1.76a6.75 6.75 0 0 0 2.711-4.685h2.023l2.947 5.104a.753.753 0 0 0 1.025.273.749.749 0 0 0 .272-1.023l-2.515-4.354h2.104l1.279 2.215a.75.75 0 0 0 .649.375c.127 0 .256-.03.375-.103a.748.748 0 0 0 .273-1.022l-.848-1.465h3.092a.75.75 0 0 0 .003-1.5zm-12.136.75c0 .257-.041.502-.076.75a5.223 5.223 0 0 1-1.943 3.358 5.242 5.242 0 0 1-1.291.766 5.224 5.224 0 0 1-1.949.384 5.157 5.157 0 0 1-3.239-1.15 5.22 5.22 0 0 1-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22 5.22 0 0 1 1.944-3.359c.393-.312.82-.576 1.291-.765a5.219 5.219 0 0 1 1.948-.384c.69 0 1.344.142 1.948.384.471.188.898.454 1.291.765a5.222 5.222 0 0 1 1.943 3.359c.035.247.076.493.076.75z' fill=':color:'/%3E%3C/svg%3E\")}.snowflakes_gid_value .snowflake__inner_type_1:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32.813' height='32.813'%3E%3Cpath d='M29.106 24.424a.781.781 0 0 1-.781.781h-3.119v3.119a.782.782 0 0 1-1.562 0v-4.682h4.682c.43.001.78.351.78.782zM4.673 9.352h4.682V4.671a.781.781 0 0 0-1.563 0V7.79H4.673a.781.781 0 0 0 0 1.562zM3.708 24.24c0 .431.35.781.781.781H7.61v3.12a.78.78 0 1 0 1.562 0v-4.683H4.489a.782.782 0 0 0-.781.782zM28.923 8.39a.78.78 0 0 0-.781-.781h-3.121V4.488a.781.781 0 0 0-1.562 0v4.684h4.684a.783.783 0 0 0 .78-.782zm3.889 8.017c0 .431-.35.781-.781.781h-3.426l1.876 1.873a.784.784 0 0 1 0 1.107.791.791 0 0 1-.554.228.773.773 0 0 1-.55-.228l-2.979-2.98h-2.995a6.995 6.995 0 0 1-1.728 3.875h5.609a.781.781 0 0 1 0 1.562h-4.666v4.667a.782.782 0 0 1-1.562 0v-5.61a7 7 0 0 1-3.866 1.719v2.995l2.978 2.98c.306.305.306.8 0 1.104a.78.78 0 0 1-1.104 0l-1.874-1.876v3.427a.781.781 0 0 1-1.562 0v-3.427l-1.875 1.876a.78.78 0 1 1-1.105-1.104l2.979-2.98v-2.995a7.016 7.016 0 0 1-3.865-1.717v5.608a.781.781 0 0 1-1.562 0v-4.667H5.535a.781.781 0 0 1 0-1.562h5.607a7.022 7.022 0 0 1-1.728-3.875H6.417l-2.979 2.979a.784.784 0 0 1-1.104 0 .781.781 0 0 1 0-1.106l1.874-1.873H.782a.78.78 0 1 1-.001-1.563h3.426L2.333 13.75a.783.783 0 0 1 1.105-1.106l2.979 2.979h2.995a6.996 6.996 0 0 1 1.72-3.866H5.533a.781.781 0 0 1 0-1.562h4.666V5.528a.781.781 0 0 1 1.562 0v5.599a6.995 6.995 0 0 1 3.865-1.717V6.415l-2.978-2.979a.782.782 0 0 1 1.105-1.105l1.874 1.875V.781a.78.78 0 1 1 1.562 0v3.426l1.875-1.875a.777.777 0 0 1 1.104 0 .78.78 0 0 1 0 1.105l-2.978 2.98v2.996a7.021 7.021 0 0 1 3.866 1.718V5.532a.78.78 0 1 1 1.562 0v4.666h4.666a.78.78 0 1 1 0 1.562h-5.599a7 7 0 0 1 1.718 3.866h2.995l2.979-2.979a.783.783 0 0 1 1.106 1.106l-1.876 1.874h3.427a.777.777 0 0 1 .778.78zm-11.006-.782a5.457 5.457 0 0 0-4.618-4.617c-.257-.037-.514-.079-.781-.079-.268 0-.524.042-.781.079a5.458 5.458 0 0 0-4.618 4.617c-.038.257-.079.514-.079.781s.041.522.079.781a5.455 5.455 0 0 0 4.618 4.616c.257.036.514.079.781.079s.524-.043.781-.079a5.457 5.457 0 0 0 4.618-4.616c.037-.259.079-.515.079-.781s-.043-.524-.079-.781z' fill=':color:'/%3E%3C/svg%3E\")}.snowflakes_gid_value .snowflake__inner_type_2:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35.79' height='35.79'%3E%3Cpath d='M7.161 22.223l.026-.047.865.5-.026.047a.503.503 0 0 1-.434.25c-.019 0-.034-.013-.053-.016l-.355-.205a.493.493 0 0 1-.023-.529zM9.969 8.988l2.785.001 1.393-2.414a.502.502 0 0 0-.869-.499l-1.103 1.913-2.208-.001a.5.5 0 1 0 .002 1zm15.854 17.813h-2.785l-1.393 2.411a.499.499 0 0 0 .436.75c.172 0 .34-.09.434-.25l1.104-1.911h2.207c.274 0 .5-.224.5-.5a.505.505 0 0 0-.503-.5zM23.038 8.99h2.785a.5.5 0 0 0 0-1h-2.207l-1.105-1.913a.5.5 0 0 0-.868.5l1.395 2.413zM12.754 26.801H9.967a.5.5 0 0 0 0 1h2.209l1.105 1.912a.496.496 0 0 0 .682.184.5.5 0 0 0 .184-.684l-1.393-2.412zm-7.218-6.309a.502.502 0 0 0 .685-.184l1.391-2.413-1.394-2.413a.5.5 0 0 0-.867.5l1.104 1.913-1.104 1.913a.5.5 0 0 0 .185.684zM30.254 15.3a.505.505 0 0 0-.685.183l-1.392 2.412 1.395 2.414a.501.501 0 0 0 .867-.5l-1.104-1.914 1.104-1.912a.5.5 0 0 0-.185-.683zm3.138 11.542a.501.501 0 0 1-.683.184l-.98-.565-2.137 1.231a.516.516 0 0 1-.5 0l-2.385-1.377a.502.502 0 0 1-.25-.433v-.854h-4.441l-2.225 3.852.736.428c.154.088.25.254.25.432l.001 2.755a.5.5 0 0 1-.25.433l-2.133 1.229v1.136c0 .274-.225.5-.5.5s-.5-.226-.5-.5v-1.136l-2.136-1.23a.5.5 0 0 1-.25-.433l.001-2.755c0-.178.096-.344.25-.432l.738-.427-2.224-3.849H9.332l.002.851a.505.505 0 0 1-.25.435l-2.387 1.377a.5.5 0 0 1-.5 0L4.06 26.46l-.982.567a.5.5 0 0 1-.5-.867l.982-.567.001-2.465c0-.179.097-.344.25-.434l2.388-1.377a.497.497 0 0 1 .5 0l.736.426 2.221-3.848-2.222-3.849-.737.426a.51.51 0 0 1-.5 0l-2.386-1.377a.5.5 0 0 1-.25-.434l.002-2.464-.983-.567a.501.501 0 0 1-.184-.683.502.502 0 0 1 .684-.183l.983.568 2.134-1.233a.5.5 0 0 1 .5 0l2.385 1.379c.156.089.25.255.25.433v.85h4.443l2.223-3.846-.74-.427a.501.501 0 0 1-.25-.434l.002-2.755c0-.178.096-.343.25-.433l2.135-1.233V.5a.5.5 0 0 1 1 0v1.135l2.134 1.231c.154.089.25.254.25.434l-.002 2.755a.503.503 0 0 1-.25.433l-.733.425 2.224 3.849h4.44l-.002-.851c0-.179.096-.344.25-.434l2.388-1.378a.502.502 0 0 1 .5 0l2.136 1.233.982-.568a.5.5 0 1 1 .5.866l-.983.568v2.464a.503.503 0 0 1-.25.433l-2.388 1.378a.5.5 0 0 1-.5 0l-.735-.426-2.222 3.849 2.223 3.849.734-.425a.506.506 0 0 1 .5 0l2.389 1.375c.154.09.25.255.25.435l-.002 2.462.982.568c.24.137.321.444.182.682zm-2.165-1.828l.001-1.597-1.888-1.087-.734.424-.348.201-.301.173-.5.289v2.179l1.885 1.088 1.386-.802.498-.286.001-.582zm-3.736-11.467l-.531-.307-2.283 1.318-2.443 3.337 2.442 3.337 2.283 1.316.531-.306-2.514-4.348 2.515-4.347zm-7.712 16.478l-.762-.438-.339-.194-.283-.166-.5-.289-.5.289-.279.162-.349.2-.757.437-.001 2.177 1.386.797.501.289.499-.287 1.386-.798-.002-2.179zM16.008 5.767l.736.425.371.214.279.16.5.288.5-.289.281-.163.367-.212.732-.424.002-2.178-1.381-.797-.502-.289-.498.287-1.385.8-.002 2.178zm6.52 14.227l-1.535-2.099 1.535-2.098.732-1-1.232.134-2.585.281-1.048-2.379-.5-1.133-.5 1.134-1.049 2.379-2.585-.281-1.232-.134.732 1 1.536 2.097-1.536 2.098-.732 1 1.232-.134 2.585-.281 1.049 2.379.5 1.134.5-1.134 1.048-2.379 2.585.281 1.232.134-.732-.999zm8.2-10.084l-1.386-.8-1.887 1.089v1.279l.002.32v.577l.5.289.28.163.367.213.732.424 1.888-1.089v-2.178l-.496-.287zM18.927 7.413l-.532.307v2.637l1.667 3.784 4.111-.447 2.283-1.317-.002-.613h-5.02l-2.507-4.351zm-9.594 4.348v.614l2.283 1.318 4.111.447 1.668-3.785V7.719l-.531-.306-2.509 4.347-5.022.001zm-2.15 1.279l.37-.213.279-.162.5-.289V10.2L6.446 9.11l-1.384.8-.499.289v.578l-.002 1.599 1.885 1.088.737-.424zm1.119 9.205l.53.306 2.281-1.316 2.443-3.339-2.442-3.337-2.281-1.317-.531.307 2.511 4.348-2.511 4.348zm-1.115-.069l-.026.047a.493.493 0 0 0 .023.529l-.734-.424-1.887 1.089-.001 1.599v.578l.5.288 1.386.8 1.887-1.088v-1.278l-.002-.321v-.577l-.5-.289-.293-.169c.02.002.035.017.055.017a.5.5 0 0 0 .433-.25l.026-.047-.867-.504zm9.679 6.202l.529-.306v-2.637l-1.668-3.785-4.111.447-2.283 1.316.002.611 5.021.002 2.51 4.352zm9.591-4.349v-.612L24.174 22.1l-4.111-.447-1.667 3.783v2.639l.531.307 2.512-4.352h5.018v-.001z' fill=':color:'/%3E%3C/svg%3E\")}.snowflakes_gid_value .snowflake__inner_type_3:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32.815' height='32.815'%3E%3Cpath d='M4.581 23.55h4.681v4.681a.78.78 0 1 1-1.562 0v-3.118H4.581a.781.781 0 0 1 0-1.563zM29.016 8.481a.781.781 0 0 0-.781-.781h-3.119V4.582a.781.781 0 0 0-1.562 0v4.681h4.682c.429 0 .78-.35.78-.782zm-24.252.598l4.683-.001V4.395a.781.781 0 0 0-1.562 0v3.121l-3.121.001a.781.781 0 0 0 0 1.562zm23.655 14.287h-4.685l.002 4.684a.78.78 0 1 0 1.562 0l-.002-3.121h3.122a.781.781 0 0 0 .001-1.563zm4.394-6.96a.78.78 0 0 1-.781.781h-3.426l1.876 1.875a.782.782 0 0 1-1.104 1.105l-2.979-2.979h-1.986L17.19 24.41v1.987l2.977 2.979a.781.781 0 0 1-1.103 1.106l-1.874-1.875v3.426a.78.78 0 1 1-1.562 0v-3.426l-1.875 1.875a.782.782 0 0 1-1.105-1.105l2.978-2.979V24.41l-7.219-7.22H6.418l-2.98 2.98a.777.777 0 0 1-1.103 0 .781.781 0 0 1 0-1.106L4.21 17.19H.783a.78.78 0 1 1 0-1.562h3.426l-1.876-1.875a.782.782 0 1 1 1.106-1.105l2.979 2.979h1.989l7.219-7.218v-1.99L12.648 3.44a.782.782 0 1 1 1.106-1.105l1.874 1.874V.781a.782.782 0 0 1 1.563 0v3.426l1.875-1.875a.783.783 0 0 1 1.106 1.105l-2.979 2.979v1.99l7.216 7.218h1.992l2.979-2.979a.782.782 0 0 1 1.105 1.105l-1.876 1.874h3.427a.781.781 0 0 1 .777.782zm-10.613.782l.778-.78-.781-.782-5.009-5.008-.781-.781-.781.781-5.01 5.008-.781.781.781.781 5.01 5.011.782.781.78-.779 5.012-5.013zm5.863 4.646a.782.782 0 0 0-.781-.781h-6.229v6.228a.78.78 0 1 0 1.562 0v-4.665h4.666a.782.782 0 0 0 .782-.782zm-.001-10.855a.782.782 0 0 0-.781-.781h-4.664V5.532a.782.782 0 0 0-1.562 0v6.228h6.227a.78.78 0 0 0 .78-.781zm-23.318 0c0 .432.35.781.781.781h6.228V5.532a.781.781 0 0 0-1.562 0v4.666H5.525a.781.781 0 0 0-.781.781zm.002 10.855c0 .432.35.781.781.781h4.664v4.665a.78.78 0 1 0 1.562 0v-6.228H5.527a.783.783 0 0 0-.781.782z' fill=':color:'/%3E%3C/svg%3E\")}.snowflakes_gid_value .snowflake__inner_type_4:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37.794' height='37.794'%3E%3Cpath d='M30.638 17.313l-.914 1.584.915 1.585a.78.78 0 1 1-1.352.78l-1.366-2.366 1.366-2.365a.782.782 0 0 1 1.067-.286c.372.215.5.692.284 1.068zM11.65 11.08l2.733.002 1.367-2.367a.78.78 0 0 0-1.352-.781l-.915 1.585-1.831-.002h-.001a.78.78 0 0 0-.001 1.563zm14.491 15.633h-2.733l-1.365 2.365a.78.78 0 1 0 1.352.78l.914-1.584h1.831a.781.781 0 0 0 .001-1.561zm-4.1-17.998l1.367 2.367h2.733a.78.78 0 1 0 0-1.562h-1.833l-.915-1.585a.78.78 0 0 0-1.352.78zM15.75 29.08l-1.368-2.366h-2.733a.781.781 0 0 0 0 1.562h1.832l.917 1.585c.146.25.409.391.677.391a.779.779 0 0 0 .675-1.172zm-8.313-7.531a.78.78 0 0 0 1.067-.284L9.87 18.9l-1.367-2.368a.781.781 0 0 0-1.351.781l.916 1.587-.914 1.584a.776.776 0 0 0 .283 1.065zm27.827 6.798a.784.784 0 0 1-1.067.285l-.89-.515-2.096 1.209a.793.793 0 0 1-.391.105.762.762 0 0 1-.391-.105l-2.484-1.435a.78.78 0 0 1-.391-.676l-.002-2.417-2.408-1.392a7.714 7.714 0 0 1-5.467 3.168v2.773l2.093 1.208a.78.78 0 0 1 .391.676l.001 2.868c0 .28-.149.537-.392.676l-2.093 1.205v1.032a.781.781 0 0 1-1.562 0V35.98l-2.095-1.207a.78.78 0 0 1-.391-.676l.001-2.868c0-.28.15-.537.391-.676l2.094-1.206v-2.773a7.718 7.718 0 0 1-5.468-3.168l-2.408 1.392.002 2.415c0 .281-.15.539-.391.676l-2.487 1.437a.785.785 0 0 1-.782 0l-2.095-1.209-.893.518a.782.782 0 0 1-.782-1.354l.893-.517.001-2.414a.78.78 0 0 1 .391-.677l2.487-1.434a.774.774 0 0 1 .781 0l2.093 1.208 2.407-1.39a7.655 7.655 0 0 1 0-6.317l-2.406-1.39-2.096 1.209a.772.772 0 0 1-.782 0l-2.485-1.434a.786.786 0 0 1-.391-.676l.002-2.416-.894-.517a.78.78 0 0 1-.285-1.066.788.788 0 0 1 1.07-.283l.893.514 2.093-1.208a.774.774 0 0 1 .781 0L9.851 9.91c.24.14.391.398.391.675L10.24 13l2.408 1.392a7.712 7.712 0 0 1 5.468-3.167V8.45L16.02 7.242a.78.78 0 0 1-.391-.676l.002-2.87c0-.279.15-.538.391-.675l2.094-1.208V.781a.781.781 0 0 1 1.562 0v1.032l2.093 1.206a.785.785 0 0 1 .391.677l-.002 2.87c0 .28-.149.536-.391.674l-2.091 1.208v2.772a7.708 7.708 0 0 1 5.467 3.167l2.409-1.392-.002-2.416c0-.28.149-.539.391-.676l2.487-1.436c.24-.14.539-.14.781 0l2.095 1.208.894-.514a.78.78 0 1 1 .781 1.352l-.894.516v2.417c0 .279-.15.538-.391.675l-2.487 1.436a.785.785 0 0 1-.782 0l-2.092-1.209-2.408 1.39c.436.967.684 2.032.684 3.158a7.65 7.65 0 0 1-.684 3.158l2.408 1.391 2.091-1.206a.782.782 0 0 1 .78 0l2.488 1.432c.24.141.392.398.392.677l-.002 2.414.893.517a.783.783 0 0 1 .287 1.068zm-6.147-16.251l.001.9.78.453.921.531 1.706-.982v-1.965l-.78-.451-.923-.533-1.707.983.002 1.064zm-20.443-.002l.002-1.063-1.706-.985-.922.535-.778.451-.001.902-.001 1.063 1.703.982.924-.533.779-.451v-.901zm0 13.604l-.001-.899-.781-.451-.919-.533-1.706.982-.001 1.064v.901l.781.451.923.533 1.707-.982-.003-1.066zm15.109-3.076c.315-.413.586-.864.789-1.351a6.121 6.121 0 0 0 0-4.748 6.175 6.175 0 0 0-.789-1.35 6.158 6.158 0 0 0-4.106-2.375 6.48 6.48 0 0 0-.781-.056c-.266 0-.525.022-.781.056a6.149 6.149 0 0 0-4.106 2.375 6.128 6.128 0 0 0-.789 1.35 6.104 6.104 0 0 0-.479 2.374 6.1 6.1 0 0 0 1.268 3.725 6.15 6.15 0 0 0 4.106 2.374c.256.031.516.056.781.056s.525-.022.781-.056a6.142 6.142 0 0 0 4.106-2.374zM17.19 6.113l.924.531.781.452.781-.452.919-.531.002-1.968-.921-.531-.784-.452-.779.451-.922.532-.001 1.968zm3.408 25.57l-.921-.532-.781-.452-.781.452-.922.532-.001 1.966.923.531.782.451.78-.449.922-.533-.001-1.966zm11.925-5.819l.001-1.063-1.707-.981-.919.529-.782.451v.901l.001 1.065 1.702.981.924-.533.778-.449.002-.901z' fill=':color:'/%3E%3C/svg%3E\")}.snowflakes_gid_value .snowflake__inner_type_5:before{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31.25' height='31.25'%3E%3Cpath d='M20.581 1.176l-3.914 3.915V0h1.041v2.576L19.845.439l.736.737zm-1.615 9.069l.351.217 6.623-6.625-.736-.737-6.048 6.051a7.141 7.141 0 0 0-1.449-.6v-.082l5.082-5.082-.737-.737-5.387 5.388v1.33l.402.093a6.213 6.213 0 0 1 1.899.784zm2.041 2.043c.368.585.63 1.224.786 1.893l.094.403h1.028l5.171-5.173-.736-.737-4.699 4.701a7.523 7.523 0 0 0-.549-1.28l6.048-6.05-.737-.735-6.622 6.625.216.353zm7.368 1.254l1.921-1.923-.736-.735-3.699 3.7h5.39v-1.042h-2.876zm1.185 6.826l.736-.736-1.923-1.923h2.877v-1.042h-5.389l3.699 3.701zm-6.915-2.498l4.705 4.707.736-.736-5.171-5.174h-1.03l-.096.4a6.24 6.24 0 0 1-.795 1.883l-.22.353 6.639 6.641.736-.736-6.061-6.062c.227-.414.414-.84.557-1.276zm-3.7 3.125a6.241 6.241 0 0 1-1.88.794l-.399.096v1.33l5.387 5.387.736-.736-5.082-5.082v-.089a7.322 7.322 0 0 0 1.434-.605l6.061 6.062.736-.736-6.641-6.641-.352.22zM16.667 31.25h1.041v-2.576l2.137 2.137.736-.737-3.914-3.914v5.09zm-5.26-.439l2.134-2.137v2.576h1.042v-5.093l-3.913 3.916.737.738zm.897-9.816l-.352-.222-6.642 6.641.736.736 6.062-6.062c.456.254.937.456 1.433.605v.089l-5.08 5.082.736.736 5.387-5.387v-1.33l-.4-.096a6.175 6.175 0 0 1-1.88-.792zm-2.046-2.047a6.315 6.315 0 0 1-.798-1.883l-.096-.4H8.335l-5.172 5.174.737.736 4.706-4.71c.145.441.329.865.556 1.276L3.1 25.202l.736.736 6.643-6.643-.221-.347zM0 16.667v1.042h2.876L.954 19.632l.736.736 3.698-3.701H0zm1.69-5.783l-.736.735 1.921 1.923H0v1.042h5.39l-3.7-3.7zm6.916 2.498L3.9 8.674l-.736.737 5.172 5.173h1.029l.096-.4a6.15 6.15 0 0 1 .798-1.881l.222-.352L3.837 5.31l-.736.736 6.062 6.06a7.268 7.268 0 0 0-.557 1.276zm-.145-9.996l5.08 5.082v.088c-.497.15-.977.352-1.433.606L6.047 3.101l-.736.737 6.643 6.643.352-.222a6.223 6.223 0 0 1 1.88-.797l.4-.095v-1.33L9.2 2.649l-.739.737zm5.081-.81L11.408.439l-.736.737 3.913 3.917V0h-1.042v2.576zm-1.757 14.831a4.2 4.2 0 0 0 2.06 2.058l.739.338v-3.136h-3.138l.339.74zm0-3.562l-.337.738h3.135v-3.136l-.739.338a4.223 4.223 0 0 0-2.059 2.06zm7.679 3.561l.338-.739h-3.135v3.136l.738-.338a4.204 4.204 0 0 0 2.059-2.059zm0-3.561a4.198 4.198 0 0 0-2.059-2.06l-.738-.34v3.138h3.135l-.338-.738z' fill=':color:'/%3E%3C/svg%3E\")}".replace(
                            /:color:/g,
                            encodeURIComponent(this.params.color)
                        )
                    )),
                    (this.animationStyleNode = this.injectStyle(this.getAnimationStyle()));
            }),
            (l.prototype.injectStyle = function (t, e) {
                return (function (t, e) {
                    return e || ((e = document.createElement("style")), document.head.appendChild(e)), (e.textContent = t), e;
                })(t.replace(/_gid_value/g, "_gid_".concat(this.gid)), e);
            }),
            (l.prototype.getFlakeParams = function () {
                var t = this.height(),
                    e = this.params;
                return { containerHeight: t, gid: this.gid, count: e.count, speed: e.speed, rotation: e.rotation, minOpacity: e.minOpacity, maxOpacity: e.maxOpacity, minSize: e.minSize, maxSize: e.maxSize, types: e.types, wind: e.wind };
            }),
            (l.prototype.appendFlakes = function () {
                var t = this,
                    e = this.getFlakeParams();
                this.flakes = [];
                for (var a = 0; a < this.params.count; a++) this.flakes.push(new m(e));
                this.flakes
                    .sort(function (t, e) {
                        return t.size - e.size;
                    })
                    .forEach(function (e) {
                        e.appendTo(t.container);
                    });
            }),
            (l.prototype.setParams = function (e) {
                var a = e || {},
                    n = {};
                return (
                    Object.keys(t).forEach(function (e) {
                        n[e] = void 0 === a[e] ? t[e] : a[e];
                    }),
                    n
                );
            }),
            (l.prototype.getAnimationStyle = function () {
                for (
                    var t = Math.ceil(this.params.maxSize * Math.sqrt(2)),
                        e = this.isBody() ? "calc(100vh + ".concat(t, "px)") : "".concat(this.height() + t, "px"),
                        a = this.gid,
                        n = ["@keyframes snowflake_gid_".concat(a, "_y{from{transform:translateY(").concat("0px", ")}to{transform:translateY(").concat(e, ")}}")],
                        i = 0;
                    i <= 20;
                    i++
                ) {
                    var l = c(i, this.params.minSize, this.params.maxSize) + "px";
                    n.push("@keyframes snowflake_gid_".concat(a, "_x_").concat(i, "{from{transform:translateX(0px)}to{transform:translateX(").concat(l, ")}}"));
                }
                return n.join("\n");
            }),
            (l.prototype.updateAnimationStyle = function () {
                this.injectStyle(this.getAnimationStyle(), this.animationStyleNode);
            }),
            (l.prototype.removeStyles = function () {
                l.instanceCounter || (i(this.mainStyleNode), delete this.mainStyleNode), i(this.imagesStyleNode), delete this.imagesStyleNode, i(this.animationStyleNode), delete this.animationStyleNode;
            }),
            (l.prototype.width = function () {
                return this.params.width || (this.isBody() ? window.innerWidth : this.params.container.offsetWidth);
            }),
            (l.prototype.height = function () {
                return this.params.height || (this.isBody() ? window.innerHeight : this.params.container.offsetHeight + this.params.maxSize);
            }),
            (l.gid = 0),
            (l.instanceCounter = 0),
            (l.defaultParams = t),
            l
        );
    })())();
})();
