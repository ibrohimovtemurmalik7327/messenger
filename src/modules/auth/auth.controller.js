const AuthService = require('./auth.service');

class AuthController {
    registerStart = async (req, res) => {
        try {
            const result = await AuthService.registerStart(req.body);

            if (!result.success) {
                if (result.error === 'PHONE_ALREADY_USED') return res.status(409).json({ message: 'Phone already used' });
                if (result.error === 'USERNAME_ALREADY_USED') return res.status(409).json({ message: 'Username already used' });

                if (result.error === 'ACTIVE_TICKET_EXISTS') {
                    return res.status(429).json({
                        message: 'OTP already sent. Please verify existing ticket.',
                        data: result.data,
                    });
                }

                if (result.error === 'INTERNAL') {
                    console.error('registerStart internal:', result.error_details);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                return res.status(400).json({ message: 'Bad request' });
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error('registerStart error:', error);
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    registerVerify = async (req, res) => {
        try {
            const result = await AuthService.registerVerify(req.body);

            if (!result.success) {
                if (result.error === 'TICKET_NOT_FOUND') return res.status(404).json({ message: 'Ticket not found' });
                if (result.error === 'TICKET_EXPIRED') return res.status(400).json({ message: 'Ticket expired' });
                if (result.error === 'TOO_MANY_ATTEMPTS') return res.status(429).json({ message: 'Too many attempts' });
                if (result.error === 'INVALID_CODE') return res.status(400).json({ message: 'Invalid code' });
                if (result.error === 'TICKET_NOT_PENDING') return res.status(400).json({ message: 'Ticket is not pending' });
                if (result.error === 'INVALID_TICKET_TYPE') return res.status(400).json({ message: 'Invalid ticket type' });

                if (result.error === 'PHONE_ALREADY_USED') return res.status(409).json({ message: 'Phone already used' });
                if (result.error === 'USERNAME_ALREADY_USED') return res.status(409).json({ message: 'Username already used' });

                if (result.error === 'INTERNAL') {
                    console.error('registerVerify internal:', result.error_details);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                return res.status(400).json({ message: 'Bad request' });
            }

            return res.status(201).json(result);
        } catch (error) {
            console.error('registerVerify error:', error);
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };

    loginByUserName = async (req, res) => {
        try {
            const result = await AuthService.loginByUserName(req.body);

            if (!result.success) {
                return res.status(401).json({ message: 'Username or password incorrect' });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };
}

module.exports = new AuthController();