export function getAPIConfig(method: string, urlHandle: string, dataParam: any = {}) {
  return {
    method: method,
    url: urlHandle,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.APP_URI,
    },
    data: dataParam,
  };
}