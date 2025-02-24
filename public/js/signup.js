const _0x855bfa = _0x5f88;
(function (_0x53c684, _0x5c4894) {
  const _0x19695e = _0x5f88,
    _0x4e1351 = _0x53c684();
  while (!![]) {
    try {
      const _0x2a5dd6 =
        parseInt(_0x19695e(0xff)) / 0x1 +
        parseInt(_0x19695e(0x129)) / 0x2 +
        parseInt(_0x19695e(0xfe)) / 0x3 +
        (parseInt(_0x19695e(0x11b)) / 0x4) *
          (parseInt(_0x19695e(0x109)) / 0x5) +
        (parseInt(_0x19695e(0x10a)) / 0x6) * (parseInt(_0x19695e(0xfb)) / 0x7) +
        (-parseInt(_0x19695e(0x12c)) / 0x8) *
          (parseInt(_0x19695e(0x127)) / 0x9) +
        -parseInt(_0x19695e(0x123)) / 0xa;
      if (_0x2a5dd6 === _0x5c4894) break;
      else _0x4e1351["push"](_0x4e1351["shift"]());
    } catch (_0x3e1126) {
      _0x4e1351["push"](_0x4e1351["shift"]());
    }
  }
})(_0x2788, 0xe05e9);
let signup_name = null,
  signup_email = null,
  signup_password = null,
  signup_password_confirm = null,
  signup_mobileNumber = null;
document["getElementById"](_0x855bfa(0xf9))["addEventListener"]("click", () => {
  const _0x24ea41 = _0x855bfa;
  (signup_name =
    document["getElementById"]("fullname")["value"][_0x24ea41(0x12b)]()),
    (signup_email = document[_0x24ea41(0x122)]("signup_email")
      [_0x24ea41(0x10c)][_0x24ea41(0x12b)]()
      ["toLowerCase"]()),
    (signup_password =
      document[_0x24ea41(0x122)]("create-password")[_0x24ea41(0x10c)][
        _0x24ea41(0x12b)
      ]()),
    (signup_mobileNumber = document["getElementById"](_0x24ea41(0x10f))[
      _0x24ea41(0x10c)
    ][_0x24ea41(0x12b)]()),
    (signup_password_confirm = document["getElementById"](_0x24ea41(0x112))[
      "value"
    ][_0x24ea41(0x12b)]());
  if (
    !signup_email ||
    !signup_mobileNumber ||
    !signup_name ||
    !signup_password ||
    !signup_password_confirm
  ) {
    change_placeholder(), fieldVisible();
    return;
  }
  console[_0x24ea41(0x118)](_0x24ea41(0x100));
  if (signup_name[_0x24ea41(0x116)] < 0x5) {
    fieldVisible(_0x24ea41(0x105)),
      (document[_0x24ea41(0x122)](_0x24ea41(0x10e))[_0x24ea41(0x10c)] = "");
    return;
  }
  console["log"](_0x24ea41(0x119));
  if (!email_checker(signup_email)) return;
  console[_0x24ea41(0x118)](_0x24ea41(0x11d));
  if (!password_checker()) return;
  console["log"](_0x24ea41(0x117));
  if (validate_number()) return;
  console[_0x24ea41(0x118)](_0x24ea41(0x12a)),
    senddata(signup_name, signup_email, signup_password, signup_mobileNumber);
});
function change_placeholder() {
  const _0x4f7f97 = _0x855bfa;
  (document[_0x4f7f97(0x122)]("fullname")[_0x4f7f97(0xfd)] = _0x4f7f97(0x11c)),
    document[_0x4f7f97(0x122)](_0x4f7f97(0x10e))[_0x4f7f97(0x120)][
      _0x4f7f97(0x113)
    ](_0x4f7f97(0xfa)),
    (document[_0x4f7f97(0x122)](_0x4f7f97(0x110))["placeholder"] =
      _0x4f7f97(0x11c)),
    document[_0x4f7f97(0x122)](_0x4f7f97(0x110))[_0x4f7f97(0x120)][
      _0x4f7f97(0x113)
    ](_0x4f7f97(0xfa)),
    (document[_0x4f7f97(0x122)](_0x4f7f97(0x10f))[_0x4f7f97(0xfd)] =
      _0x4f7f97(0x11c)),
    document[_0x4f7f97(0x122)](_0x4f7f97(0x10f))[_0x4f7f97(0x120)][
      _0x4f7f97(0x113)
    ]("placeholder-red-400"),
    (document[_0x4f7f97(0x122)]("create-password")[_0x4f7f97(0xfd)] =
      "required!"),
    document[_0x4f7f97(0x122)](_0x4f7f97(0x125))[_0x4f7f97(0x120)][
      _0x4f7f97(0x113)
    ]("placeholder-red-400");
}
function _0x5f88(_0x5d8473, _0x4b631a) {
  const _0x278883 = _0x2788();
  return (
    (_0x5f88 = function (_0x5f887c, _0x43507c) {
      _0x5f887c = _0x5f887c - 0xf9;
      let _0xf74fbb = _0x278883[_0x5f887c];
      return _0xf74fbb;
    }),
    _0x5f88(_0x5d8473, _0x4b631a)
  );
}
function email_checker(_0x5a1503) {
  const _0x265e2a = _0x855bfa;
  try {
    return (
      (temp = _0x5a1503["split"]("@")),
      temp[0x1] == _0x265e2a(0x121) && temp[_0x265e2a(0x116)] === 0x2
        ? 0x1
        : (fieldVisible(_0x265e2a(0xfc)), 0x0)
    );
  } catch (_0x25c76f) {
    return fieldVisible(_0x265e2a(0x128)), 0x0;
  }
}
function password_checker() {
  return signup_password === signup_password_confirm
    ? 0x1
    : (fieldVisible("password\x20fields\x20dont\x20match"), 0x0);
}
function validate_number() {
  if (signup_mobileNumber["length"] != 0xa || isNaN(signup_mobileNumber))
    return fieldVisible("Invalid\x20mobile\x20number!"), 0x1;
  return 0x0;
}
async function senddata(_0x18696f, _0x1dfc6a, _0x7cda2d, _0x117238) {
  const _0x5e1cdd = _0x855bfa;
  try {
    const _0x53e963 = await fetch(_0x5e1cdd(0x114), {
      method: _0x5e1cdd(0x11e),
      headers: { "Content-Type": _0x5e1cdd(0x103) },
      body: JSON[_0x5e1cdd(0x111)]({
        email: _0x1dfc6a,
        name: _0x18696f,
        password: _0x7cda2d,
        number: _0x117238,
      }),
    });
    if (_0x53e963["ok"]) {
      const _0x22ca61 = await _0x53e963[_0x5e1cdd(0x10d)]();
      if (_0x22ca61[_0x5e1cdd(0x124)])
        console[_0x5e1cdd(0x118)](_0x5e1cdd(0x108)),
          (window[_0x5e1cdd(0x126)]["href"] = "/");
      else {
        fieldVisible(_0x22ca61["message"]);
        return;
      }
    } else window[_0x5e1cdd(0x106)](_0x5e1cdd(0x102));
  } catch (_0x33bd06) {
    window["alert"](_0x5e1cdd(0x107));
  }
}
function fieldVisible(_0xd30f0 = "") {
  const _0x5d3545 = _0x855bfa;
  document[_0x5d3545(0x122)](_0x5d3545(0x10f))["parentNode"][_0x5d3545(0x120)][
    _0x5d3545(0x11a)
  ](_0x5d3545(0x104), _0x5d3545(0x11f)),
    document[_0x5d3545(0x122)](_0x5d3545(0x115))[_0x5d3545(0x120)][
      _0x5d3545(0x11a)
    ]("hidden", _0x5d3545(0x101)),
    (document[_0x5d3545(0x122)]("fill-all-field")[_0x5d3545(0x10b)] = _0xd30f0);
}
function _0x2788() {
  const _0x49a99e = [
    "stringify",
    "confirm-password",
    "add",
    "/signup",
    "fill-all-field",
    "length",
    "yes4",
    "log",
    "yes2",
    "replace",
    "2351144nTkPJX",
    "required!",
    "yes3",
    "POST",
    "mb-2",
    "classList",
    "cuchd.in",
    "getElementById",
    "32956380RxhBvk",
    "success",
    "create-password",
    "location",
    "18WDUpPD",
    "Invalid\x20Email\x20format!",
    "272804hpQrZA",
    "yes5",
    "trim",
    "2728184CcwrfF",
    "signup_button",
    "placeholder-red-400",
    "3926867PJdUMa",
    "Please\x20enter\x20the\x20valid\x20cuchd\x20email!",
    "placeholder",
    "382149FeuQxw",
    "1774401CQYtWo",
    "yes1",
    "flex",
    "Some\x20error\x20occured\x20please\x20try\x20after\x20some\x20time",
    "application/json",
    "mb-6",
    "Name\x20is\x20too\x20short!",
    "alert",
    "Some\x20error\x20occured\x20please\x20try\x20again\x20after\x20some\x20time",
    "data\x20sent\x20successfully",
    "10xsOrSp",
    "18YBNUbe",
    "innerText",
    "value",
    "json",
    "fullname",
    "mobileNumber",
    "signup_email",
  ];
  _0x2788 = function () {
    return _0x49a99e;
  };
  return _0x2788();
}
