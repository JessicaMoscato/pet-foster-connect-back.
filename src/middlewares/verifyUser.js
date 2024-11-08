export function verifyUser (userId) {
return function (req, res, next) {
    if (userId !== req.user.id) {
        
    }
}
}