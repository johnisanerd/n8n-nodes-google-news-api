import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input. Optional fields are only
 * sent when the user provides a value so the Actor keeps its own defaults.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	const input: Record<string, any> = {
		...defaultInput,
		q: context.getNodeParameter('q', itemIndex),
		safe: context.getNodeParameter('safe', itemIndex),
		max_pages: context.getNodeParameter('max_pages', itemIndex),
	};

	const location = context.getNodeParameter('location', itemIndex, '') as string;
	const gl = context.getNodeParameter('gl', itemIndex, '') as string;
	const hl = context.getNodeParameter('hl', itemIndex, '') as string;

	if (location) input.location = location;
	if (gl) input.gl = gl;
	if (hl) input.hl = hl;

	return input;
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Article',
				value: 'article',
			},
		],
		default: 'article',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['article'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search news articles',
				description: 'Search news and return one item per article',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'q',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. technology news',
		description: 'The query to search news for',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		default: '',
		placeholder: 'e.g. United States',
		description: 'Location to run the search from. Optional.',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
	{
		displayName: 'Country Code',
		name: 'gl',
		type: 'string',
		default: '',
		placeholder: 'e.g. us',
		description: 'Two-letter country code the search runs from',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
	{
		displayName: 'Language Code',
		name: 'hl',
		type: 'string',
		default: '',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
	{
		displayName: 'Safe Search',
		name: 'safe',
		type: 'options',
		options: [
			{ name: 'Active', value: 'active' },
			{ name: 'Off', value: 'off' },
		],
		default: 'off',
		description: 'Whether to filter explicit results',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
	{
		displayName: 'Maximum Pages',
		name: 'max_pages',
		type: 'number',
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'How many result pages to fetch',
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['article'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each article',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful article fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each article',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['article'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Date', value: 'date' },
			{ name: 'Link', value: 'link' },
			{ name: 'Position', value: 'position' },
			{ name: 'Snippet', value: 'snippet' },
			{ name: 'Source', value: 'source' },
			{ name: 'Title', value: 'title' },
		],
		default: ['position', 'title', 'source', 'link', 'date'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
