import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

export function getUserFromCookie(req) {
  if (process.server && process.static) return
  if (!req.headers.cookie) return

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie) // cookieをパース
    const accessTokenCookie = parsed.access_token // アクセストークンの取得
    if (!accessTokenCookie) return

    const decodeToken = jwtDecode(accessTokenCookie) // jwtをデコードしてクライアントに返却
    if (!decodeToken) return
    return decodeToken
  }
}
