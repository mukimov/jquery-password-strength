/*!jQuery Password Strength Metter Plugin - v1.0.0 - 11/30/2012
 * Password Strength Meter is a jQuery plug-in provide you smart algorithm to detect a password strength. Based on Darren Mason(djmason9@gmail.com) plugin http://code.google.com/p/jquerycustomselectbox/source/browse/trunk/WebRoot/password_strength/password_strength_plugin.js.
 * Plugin webpage http://mukimov.github.com/jquery-password-strength/
 * Plugin source https://github.com/mukimov/jquery-password-strength
 * Copyright (c) 2012 Shukhrat Mukimov(mukimov@gmail.com); LicensedMIT, GPL
 */
(function(e) {
    e.fn.poorPass = "Very Poor";
    e.fn.weakPass = "Weak";
    e.fn.goodPass = "Good";
    e.fn.strongPass = "Strong";
    e.fn.excellentPass = "Excellent";
    e.fn.samePassword = "Username and Password identical.";
    e.fn.resultStyle = "";
    e.fn.passStrength = function(t, n, r) {
        if (e.isFunction(t)) {
            n = t;
            t = null
        }
        var i = {
            minLength: 5,
            appendTo: "",
            messages: "",
            rules: {
                preferedLength: 8,
                minNums: 2,
                minLowerChars: 2,
                minUpperChars: 2,
                minSymbols: 1,
                hasLowerAndUpperChars: false,
                hasNumbersAndChars: false,
                hasNumbersAndSymbols: false,
                hasCharsAndSymbols: false,
                hasRepetitionInPassword: 0
            },
            complete: "",
            poorPass: "poorPass",
            weakPass: "weakPass",
            goodPass: "goodPass",
            strongPass: "strongPass",
            excellentPass: "excellentPass",
            baseStyle: "testresult",
            userid: "",
            messageloc: 1
        };
        var s = e.extend(i, t);
        return this.each(function() {
            var t = e(this);
            var i = new Array;
            e(t).unbind("keyup").keyup(function(t) {
                var n = e.fn.teststrength(e(this).val(), e(s.userid).val(), s);
                var i = true;
                if (e.isFunction(r)) {
                    var o = r(t);
                    if (e.type(o) === "boolean") {
                        i = o
                    }
                }
                if (i === true) {
                    if (s.messageloc === 1) {
                        if (s.appendTo.length > 0) {
                            e(this).siblings("." + s.appendTo).find("span").remove();
                            e(this).siblings("." + s.appendTo).removeClass().addClass(s.appendTo).addClass(e(this).resultStyle).append("<span>" + n + "</span>")
                        } else {
                            e(this).next("." + s.baseStyle).remove();
                            e(this).after('<span class = "' + s.baseStyle + '"><span></span></span>');
                            e(this).next("." + s.baseStyle).addClass(e(this).resultStyle).find("span").text(n)
                        }
                    } else {
                        if (s.appendTo.length > 0) {
                            e(this).siblings("." + s.appendTo).find("span").remove();
                            e(this).siblings("." + s.appendTo).removeClass().addClass(s.appendTo).addClass(e(this).resultStyle).append("<span>" + n + "</span>")
                        } else {
                            e(this).prev("." + s.baseStyle).remove();
                            e(this).before('<span class = "' + s.baseStyle + '"><span></span></span>');
                            e(this).prev("." + s.baseStyle).addClass(e(this).resultStyle).find("span").text(n)
                        }
                    }
                }
            });
            e.fn.teststrength = function(t, r, s) {
                r = typeof r !== "undefined" ? r : "";
                var o = 0;
                var u = 1;
                e.map(s.rules, function(e) {
                    if (e != 0 || e !== false) {
                        u += 1
                    }
                });
                if (t.length < s.minLength) {
                    e(s.messages).text("Minimun length " + s.minLength);
                    this.resultStyle = s.poorPass;
                    return e(this).poorPass
                }
                if (t.toLowerCase() == r.toLowerCase()) {
                    e(s.messages).text(e(this).samePassword);
                    this.resultStyle = s.weakPass;
                    return e(this).poorPass
                }
                var a = new Array;
                i = new Array;
                a[0] = function() {
                    var n = s.rules.minNums;
                    var r = t.match(new RegExp("[0-9]", "g"));
                    return e.fn.applyRule(r, n, "number")
                };
                a[1] = function() {
                    var n = s.rules.minSymbols;
                    var r = t.match(new RegExp("[!,@,#,$,%,^,&,*,?,_,~]", "g"));
                    return e.fn.applyRule(r, n, "symbol")
                };
                a[2] = function() {
                    var n = s.rules.minLowerChars;
                    var r = t.match(new RegExp("[a-z]", "g"));
                    return e.fn.applyRule(r, n, "lower character")
                };
                a[3] = function() {
                    var n = s.rules.minUpperChars;
                    var r = t.match(new RegExp("[A-Z]", "g"));
                    return e.fn.applyRule(r, n, "upper character")
                };
                a[4] = function() {
                    return s.rules.hasLowerAndUpperChars && t.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
                };
                a[5] = function() {
                    return s.rules.hasNumbersAndChars && t.match(/([a-zA-Z])/) && t.match(/([0-9])/)
                };
                a[6] = function() {
                    return s.rules.hasNumbersAndSymbols && t.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && t.match(/([0-9])/)
                };
                a[7] = function() {
                    return s.rules.hasCharsAndSymbols && t.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && t.match(/([a-zA-Z])/)
                };
                a[8] = function() {
                    return s.rules.preferedLength <= t.length
                };
                a[9] = function() {
                    return s.rules.hasRepetitionInPassword.enabled && (e.fn.checkRepetition(s.hasRepetitionInPassword.count, t).length - t.length) * 1 > 0
                };
                e.each(a, function(e, t) {
                    if (t()) {
                        if (u > 0) {
                            o += 100 / u
                        }
                    }
                });
                if (s.messages.length > 0) {
                    e(s.messages).text(i.length > 0 ? "Please add " + e.fn.conjoin(i, {
                        separator: ", ",
                        last: " and "
                    }) : "Prefered length " + s.preferedLength)
                }
                if (o < 0) {
                    o = 0
                }
                if (o > 100) {
                    o = 100
                }
                if (o < 30) {
                    this.resultStyle = s.weakPass;
                    return e(this).weakPass
                }
                if (o < 50) {
                    this.resultStyle = s.goodPass;
                    return e(this).goodPass
                }
                if (o < 70) {
                    this.resultStyle = s.strongPass;
                    return e(this).strongPass
                }
                e.isFunction(n) && n();
                this.resultStyle = s.excellentPass;
                return e(this).excellentPass
            };
            e.fn.applyRule = function(t, n, r) {
                if (!!t) {
                    if (t.length < n) {
                        if (t.length == 1) {
                            i.push(e.fn.addMessage(t.length, r))
                        } else {
                            i.push(e.fn.addMessage(t.length, r + "s"))
                        }
                    } else {
                        return true
                    }
                } else {
                    if (n == 1) {
                        i.push(e.fn.addMessage(n, r))
                    } else {
                        i.push(e.fn.addMessage(n, r + "s"))
                    }
                }
                return false
            };
            e.fn.addMessage = function(t, n) {
                return e.fn.conjoin([t, "more", n], {
                    separator: " ",
                    last: " "
                })
            }
        })
    }
})(jQuery);
$.fn.checkRepetition = function(e, t) {
    var n = "";
    for (var r = 0; r < t.length; r++) {
        var i = true;
        for (var s = 0; s < e && s + r + e < t.length; s++) {
            i = i && t.charAt(s + r) == t.charAt(s + r + e)
        }
        if (s < e) {
            i = false
        }
        if (i) {
            r += e - 1;
            i = false
        } else {
            n += t.charAt(r)
        }
    }
    return n
};
$.fn.conjoin = function(e, t) {
    if (e.length < 2) {
        return e[0]
    }
    var n = "";
    var r = t["separator"] || " ";
    var i = t["last"] || " and ";
    var s = e.length - 1;
    $.each(e, function(e, t) {
        if (e + 1 == s) {
            n += t
        } else if (e == s) {
            n += i + t
        } else {
            n += t + r
        }
    });
    return n
}