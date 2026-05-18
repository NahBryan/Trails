const userRepository = require("../../repositories/user.repository.js");
const passwordService = require("../../services/password.service.js");
const auditService = require("../../services/audit.service.js");
const jwtService = require("../../services/jwt.service.js");
const db = require("../../config/db.js");
exports.login = async (req, res, next) => {
  try {
    const { input, password } = req.body;

    const user = await userRepository.findByEmail(input);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const validPassword = await passwordService.comparePassword(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = jwtService.generateAccessToken({
      id: user.id,
      role: user.role,
      institutionId: user.institution_id
    });

    const refreshToken = jwtService.generateRefreshToken({
      id: user.id
    });

    return res.json({
      success: true,
      data: {
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      institutionId,
      email,
      password,
      firstName,
      lastName,
      phone
    } = req.body;

    const existing = await userRepository.findByEmail(email);

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const existing_institution = await userRepository.findIfInstitutionExists(institutionId);
    if(!existing_institution){
      return res.status(409).json({
        success: false,
        message: "Institution Doesnot Exist. Contact Support or get Information from your Institution"
      });
    }

    const passwordHash = await passwordService.hashPassword(password);
    const userId = await userRepository.create({
      institutionId: existing_institution.id,
      email,
      passwordHash,
      firstName,
      lastName,
      phone
    });

    await auditService.log({
      actorId: userId,
      institutionId: existing_institution.id,
      action: "REGISTER",
      entity: "USER",
      entityId: userId
    });

    return res.status(201).json({
      success: true,
      data: {
        userId
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try{
    const [user] = await db.execute(
      `SELECT *
       FROM users WHERE id = ? LIMIT 1`,
      [req.user.id]
    );
    return res.json({
      success: true,
      data: {
        user
      }
    });
  }catch(error){
    next(error);
  }
}