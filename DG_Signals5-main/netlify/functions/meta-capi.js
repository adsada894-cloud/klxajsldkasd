const crypto = require("crypto");

function getHeader(event, name) {
  const h = event.headers || {};
  const key = Object.keys(h).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? h[key] : undefined;
}

function getClientIp(event) {
  const cf = getHeader(event, "cf-connecting-ip");
  if (cf) return cf;
  const xnf = getHeader(event, "x-nf-client-connection-ip");
  if (xnf) return xnf;
  const xff = getHeader(event, "x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = getHeader(event, "x-real-ip");
  if (xri) return xri;
  return undefined;
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  cookieHeader.split(";").forEach(part => {
    const [k, ...v] = part.trim().split("=");
    out[k] = decodeURIComponent(v.join("=") || "");
  });
  return out;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return { statusCode: 500, body: "Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN" };
  }
  let payload;
  try { payload = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, body: "Invalid JSON" }; }
  const event_name = payload.event_name || "PageView";
  const event_time = payload.event_time || Math.floor(Date.now() / 1000);
  const event_id = payload.event_id || crypto.randomUUID();
  const event_source_url = payload.event_source_url || getHeader(event, "referer") || payload.url;
  const ua = getHeader(event, "user-agent") || payload.user_agent;
  const ip = getClientIp(event) || payload.client_ip_address;
  const cookies = parseCookies(getHeader(event, "cookie"));
  const fbp = payload.fbp || cookies["_fbp"];
  const fbc = payload.fbc || cookies["_fbc"];
  const user_data = { client_ip_address: ip, client_user_agent: ua, fbp, fbc };
  Object.keys(user_data).forEach(k => user_data[k] === undefined && delete user_data[k]);
  const data = { data: [{ event_name, event_time, event_id, event_source_url, action_source: "website", user_data }] };
  const url = "https://graph.facebook.com/v19.0/" + PIXEL_ID + "/events?access_token=" + ACCESS_TOKEN;
  try {
    const resp = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const json = await resp.json();
    return { statusCode: resp.ok ? 200 : 500, body: JSON.stringify({ ok: resp.ok, meta: json, event_id }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: String(e) }) };
  }
};