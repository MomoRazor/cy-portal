import { IUser } from './restAPI'

export const parseUserOptions = (options: IUser[]) => {
    return options.map((user: IUser) => ({
        id: user.id || '',
        display: user.name + ' ' + user.surname
    }))
}
