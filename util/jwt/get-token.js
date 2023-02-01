
export const getTokenFromHeader = req => {
    const headers = req.headers;
   const token = headers['authorization'].split(" ")[1]

   return token ? token : false
}