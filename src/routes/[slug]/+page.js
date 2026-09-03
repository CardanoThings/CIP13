import pageData from '$lib/data/pageData.json';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(pageData).map((path) => ({
		slug: path.replace(/^\//, '')
	}));
}

export const load = async ({ params }) => {
	const { slug } = params;

	const data = pageData[`/${slug}`];
	const authority = `//${slug}`;

	// Fallback when no entry exists in pageData for this slug.
	if (!data) {
		return {
			title: slug || 'page',
			cips: [],
			status: 'under development',
			intro: 'Content coming soon.',
			linkBuildExplanation: '',
			exampleLink: 'web+cardano:',
			walletSupportColumns: undefined,
			supportingDocs: [],
			authority
		};
	}

	return {
		...data,
		authority
	};
};
