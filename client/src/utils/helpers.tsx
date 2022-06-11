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