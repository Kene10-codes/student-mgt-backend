import * as bcryptjs from 'bcryptjs'

export function encodePassword(password: string) {
    const SALT = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, SALT)
}


export function comparePassword(password: string, hashPassword: string): Promise<Boolean> {
    return  bcryptjs.compare(password, hashPassword)
}

export function encodeToken(refreshToken: string) {
    const SALT = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(refreshToken, SALT)
}
