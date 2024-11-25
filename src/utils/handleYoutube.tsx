function generateUrlYoutube(str: string) {
    const query = encodeURIComponent(str);
    return `https://www.youtube.com/results?search_query=${query}`;
}


export { generateUrlYoutube };