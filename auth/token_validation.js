const { verify } = require("jsonwebtoken");

function checkToken(req, res, next) {
    let token = req.get("authorization");
    if (token) {
        // removing the bearer
        token = token.slice(7);
        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: 0,
                    message: err.message
                });
            }
            else {
                next();
            }
        });
    } else {
        return res.json({
            success: 0,
            message: `Access denide! Unauthorized Personal`
        })
    }
}

module.exports = { checkToken };