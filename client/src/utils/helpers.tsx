export const contentToHtml = (text: string) => text
    .split(/\n(?!\n)/).filter(item => item !== "")
    .map((paragraph: string) => <p key={paragraph}>{paragraph}</p>);
