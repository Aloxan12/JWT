import {RoleTypes} from "../router/AppRoute";

export const contentToHtml = (text: string) => text
    .split(/\n(?!\n)/).filter(item => item !== "")
    .map((paragraph: string, index:number) => <p key={`${paragraph}- key ${index}`}>{paragraph}</p>);

export const getFileType =(fileName?: string) =>{
    return `${fileName}`
        .split('')
        .reverse()
        .join('')
        .split('.')[0]
        .split('')
        .reverse()
        .join('')
}



const memoizedIsAdmin = () => {
    let cache: { [key in string]: boolean } = {}
    return (role?: RoleTypes): boolean => {
        if (!!role) {
            if (role in cache) {
                return cache[role]
            } else {
                const isAdmin = role === RoleTypes.ADMIN
                cache[role] = isAdmin
                return isAdmin
            }
        } else {
            return false
        }
    }
}

export const useIsAdmin = memoizedIsAdmin()