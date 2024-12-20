import e from 'express';
import { redis } from '../lib/redis.js';
import User from '../models/user.model.js'; 
import jwt from 'jsonwebtoken';


const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
};

const storeRefreshToken = async (userId, refreshToken) => {
    console.log("Storing refresh token in Redis with key:", `refreshtoken:${userId}`);
    await redis.set(`refreshtoken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //prevent xss attacks, csrf attacks
        secure:process.env.NODE_ENV === "production", //only send cookie over https
        sameSite: "strict", //prevent csrf attacks, cross site request forgery
        maxAge: 15 * 60 * 1000 //15 minutes
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, //prevent xss attacks, csrf attacks
        secure:process.env.NODE_ENV === "production", //only send cookie over https
        sameSite: "strict", //prevent csrf attacks, cross site request forgery
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    })

}

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).json({message: "User already exists"});
    }
    const user = await User.create({name, email, password});

    //authrentication
    const {accessToken, refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    
    setCookies(res, accessToken, refreshToken);
    
    res.status(201).json({ user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    },
    message: "User created successfully",
});
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({message:error.message});
    }
};

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            res.json({
                _id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            });
        }else {
            res.status(401).json({message: "Invalid username or password"});
        }
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({message:error.message});
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const redisKey = `refreshtoken:${decoded.userId}`; // Correct key
                const result = await redis.del(redisKey); // Attempt to delete key
                console.log("Redis key deletion result:", result);
            } catch (err) {
                console.error("JWT Verification Error:", err.message);
            }
        }
        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }
};


//This will refresh the access token
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not provided" });
        } 
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);  
        const storedToken = await redis.get(`refreshtoken:${decoded.userId}`);
        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ message: "Token refreshed successfully" });

    } catch (error) {
        console.error("Error in refresh token controller:", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }
};


export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};