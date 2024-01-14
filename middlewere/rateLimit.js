const rateLimit=require("express-rate-limit");

const limiter=rateLimit({
    window:10*60*100,
    limit:2,
    standarHeaders:`draft-7`,
    legacyHeaders:false,
})

module.exports={
    limiter
}