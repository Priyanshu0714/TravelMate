function _0x5296(_0x32891f, _0x43735b) {
  const _0x5caa72 = _0x5caa();
  return (
    (_0x5296 = function (_0x529665, _0x236a00) {
      _0x529665 = _0x529665 - 0x174;
      let _0x11da40 = _0x5caa72[_0x529665];
      return _0x11da40;
    }),
    _0x5296(_0x32891f, _0x43735b)
  );
}
function _0x5caa() {
  const _0x28045c = [
    "value",
    "74723XBNRHn",
    "classList",
    "email",
    "message",
    "Invalid\x20Email\x20format!",
    "217544OHMybV",
    "cuchd.in",
    "addEventListener",
    "4UCfEYQ",
    "alert",
    "password",
    "log",
    "flex",
    "hidden",
    "length",
    "5HpkxMe",
    "mb-2",
    "590022wlZNoY",
    "fill-all-field",
    "21DaNaFm",
    "add",
    "getElementById",
    "trim",
    "replace",
    "json",
    "82581elvDXh",
    "required!",
    "password-box",
    "placeholder-red-400",
    "placeholder",
    "toLowerCase",
    "click",
    "34bPRfjX",
    "/home",
    "Some\x20error\x20occured.\x20Please\x20try\x20after\x20some\x20time",
    "59170ipQCLw",
    "4861AakRxB",
    "stringify",
    "Login\x20SUccessfull",
    "innerText",
    "POST",
    "success",
    "182556bJPFLM",
  ];
  _0x5caa = function () {
    return _0x28045c;
  };
  return _0x5caa();
}
const _0xb81cea = _0x5296;
(function (_0x2e9fc6, _0x5b89ec) {
  const _0x538908 = _0x5296,
    _0x4c34cb = _0x2e9fc6();
  while (!![]) {
    try {
      const _0xa2ebcd =
        (-parseInt(_0x538908(0x18b)) / 0x1) *
          (-parseInt(_0x538908(0x187)) / 0x2) +
        (-parseInt(_0x538908(0x180)) / 0x3) *
          (-parseInt(_0x538908(0x19b)) / 0x4) +
        (parseInt(_0x538908(0x176)) / 0x5) *
          (parseInt(_0x538908(0x178)) / 0x6) +
        (-parseInt(_0x538908(0x17a)) / 0x7) *
          (parseInt(_0x538908(0x198)) / 0x8) +
        -parseInt(_0x538908(0x191)) / 0x9 +
        -parseInt(_0x538908(0x18a)) / 0xa +
        parseInt(_0x538908(0x193)) / 0xb;
      if (_0xa2ebcd === _0x5b89ec) break;
      else _0x4c34cb["push"](_0x4c34cb["shift"]());
    } catch (_0x17a9ce) {
      _0x4c34cb["push"](_0x4c34cb["shift"]());
    }
  }
})(_0x5caa, 0x1a3fa);
let signin_email = null,
  signin_password = null;
document[_0xb81cea(0x17c)]("submit-button")[_0xb81cea(0x19a)](
  _0xb81cea(0x186),
  () => {
    const _0xa3a14a = _0xb81cea;
    (signin_email = document["getElementById"](_0xa3a14a(0x195))
      [_0xa3a14a(0x192)][_0xa3a14a(0x185)]()
      ["trim"]()),
      (signin_password = document[_0xa3a14a(0x17c)](_0xa3a14a(0x19d))[
        _0xa3a14a(0x192)
      ][_0xa3a14a(0x17d)]());
    if (!signin_email || !signin_password) {
      change_placeholder();
      return;
    }
    if (!email_checker(signin_email)) {
      document[_0xa3a14a(0x17c)](_0xa3a14a(0x195))["value"] = "";
      return;
    }
    sendData(signin_email, signin_password);
  },
);
function change_placeholder() {
  const _0x4e5d66 = _0xb81cea;
  (document[_0x4e5d66(0x17c)](_0x4e5d66(0x195))[_0x4e5d66(0x184)] =
    _0x4e5d66(0x181)),
    document[_0x4e5d66(0x17c)]("email")["classList"][_0x4e5d66(0x17b)](
      _0x4e5d66(0x183),
    ),
    (document[_0x4e5d66(0x17c)](_0x4e5d66(0x19d))[_0x4e5d66(0x184)] =
      _0x4e5d66(0x181)),
    document["getElementById"](_0x4e5d66(0x19d))[_0x4e5d66(0x194)][
      _0x4e5d66(0x17b)
    ](_0x4e5d66(0x183));
}
function email_checker(_0x225487) {
  const _0x342903 = _0xb81cea;
  try {
    return (
      (temp = _0x225487["split"]("@")),
      temp[0x1] == _0x342903(0x199) && temp[_0x342903(0x175)] === 0x2
        ? 0x1
        : ((document[_0x342903(0x17c)](_0x342903(0x179))["innerText"] =
            "Please\x20enter\x20the\x20valid\x20cuchd\x20email!"),
          document["getElementById"](_0x342903(0x179))[_0x342903(0x194)][
            _0x342903(0x17e)
          ](_0x342903(0x174), _0x342903(0x19f)),
          document[_0x342903(0x17c)](_0x342903(0x182))[_0x342903(0x194)][
            _0x342903(0x17e)
          ]("mb-6", _0x342903(0x177)),
          0x0)
    );
  } catch (_0x5d1e4f) {
    return (
      (document[_0x342903(0x17c)]("fill-all-field")[_0x342903(0x18e)] =
        _0x342903(0x197)),
      document[_0x342903(0x17c)]("fill-all-field")[_0x342903(0x194)][
        _0x342903(0x17e)
      ]("hidden", _0x342903(0x19f)),
      0x0
    );
  }
}
async function sendData(_0x208a09, _0x1f6938) {
  const _0x39e63f = _0xb81cea;
  try {
    const _0x1fcaff = await fetch(window["location"]["href"], {
      method: _0x39e63f(0x18f),
      headers: { "Content-Type": "application/json" },
      body: JSON[_0x39e63f(0x18c)]({ email: _0x208a09, password: _0x1f6938 }),
    });
    if (_0x1fcaff["ok"]) {
      const _0x50b560 = await _0x1fcaff[_0x39e63f(0x17f)]();
      _0x50b560[_0x39e63f(0x190)]
        ? (console[_0x39e63f(0x19e)](_0x39e63f(0x18d)),
          (window["location"]["href"] = _0x39e63f(0x188)))
        : ((document["getElementById"](_0x39e63f(0x179))[_0x39e63f(0x18e)] =
            _0x50b560[_0x39e63f(0x196)]),
          document[_0x39e63f(0x17c)](_0x39e63f(0x179))[_0x39e63f(0x194)][
            _0x39e63f(0x17e)
          ]("hidden", _0x39e63f(0x19f)));
    } else
      (document[_0x39e63f(0x17c)](_0x39e63f(0x179))[_0x39e63f(0x18e)] =
        "Invalid\x20Credentails"),
        document["getElementById"](_0x39e63f(0x179))[_0x39e63f(0x194)][
          _0x39e63f(0x17e)
        ](_0x39e63f(0x174), _0x39e63f(0x19f));
  } catch (_0x16d7fc) {
    window[_0x39e63f(0x19c)](_0x39e63f(0x189));
  }
}
