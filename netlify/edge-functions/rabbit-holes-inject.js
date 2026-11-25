export default async (request, context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  let html = await response.text();
  if (!html.includes("rabbit-holes-redesign.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="/assets/rabbit-holes-redesign.css"></head>');
    html = html.replace("</body>", '<script src="/assets/rabbit-holes-redesign.js"></script></body>');
  }
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};
export const config = { path: "/*" };
