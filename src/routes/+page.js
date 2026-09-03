export const load = async () => {
    const pageData = await import('$lib/data/pageData.json');

    return {
        pages: pageData
    };
};