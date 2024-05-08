const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Masukkan token terlebih dahulu'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan'
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, admin) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: "Token tidak valid" });
            }

            const adaToken = await prisma.user.findUnique({
                where: { token }
            });

            if (!adaToken) {
                return res.status(401).json({ success: false, message: "Tidak ada token atau sudah logout sebelumnya" });
            }

            const currentDate = new Date();
            const tokenExpirationDate = new Date(adaToken.expires_at);

            if (currentDate > tokenExpirationDate) {
                return res.status(400).json({ success: false, message: 'Token sudah kadaluarsa' });
            } else {
                req.admin = admin;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error while validating token'
        });
    }
};

module.exports = verifyToken;
