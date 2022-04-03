export const contentToHtml = (text: string) => text
    .split(/\n(?!\n)/).filter(item => item !== "")
    .map((paragraph: string, index:number) => <p key={`${paragraph}- key ${index}`}>{paragraph}</p>);
