const CARD_TYPE_MONEY = "money";
const CARD_TYPE_PROPERTY = "property";
const CARD_TYPE_WILD = "wild";
const CARD_TYPE_RENT = "rent";
const CARD_TYPE_LEASE = "lease";
const CARD_TYPE_BIRTHDAY = "birthday";
const CARD_TYPE_DEBT = "debt";
const CARD_TYPE_SWAP = "swap";
const CARD_TYPE_STEAL = "steal";
const CARD_TYPE_DOUBLERENT = "doublerent";
const CARD_TYPE_DEALBREAKER = "dealbreaker";
const CARD_TYPE_NOCARD = "nocard";
const CARD_TYPE_PASSGO = "passgo";
const CARD_TYPE_HOUSE = "house";
const CARD_TYPE_HOTEL = "hotel";

var LABELS = {};
LABELS[CARD_TYPE_RENT] = "Rent from ONE";
LABELS[CARD_TYPE_BIRTHDAY] = "Birthday!";
LABELS[CARD_TYPE_DEBT] = "Debt Collector";
LABELS[CARD_TYPE_SWAP] = "Swap card";
LABELS[CARD_TYPE_STEAL] = "Steal card";
LABELS[CARD_TYPE_DOUBLERENT] = "Double rent";
LABELS[CARD_TYPE_DEALBREAKER] = "Deal Breaker";
LABELS[CARD_TYPE_NOCARD] = "Just say No!";
LABELS[CARD_TYPE_PASSGO] = "Pass Go!";
LABELS[CARD_TYPE_HOUSE] = "House";
LABELS[CARD_TYPE_HOTEL] = "Hotel";

const PROMPTS = {};
PROMPTS[CARD_TYPE_RENT] = "Choose ONE player to pay rent on ANY of your property";
PROMPTS[CARD_TYPE_BIRTHDAY] = "Each player gives you $2";
PROMPTS[CARD_TYPE_DEBT] = "Coose ONE player to pay you $5";
PROMPTS[CARD_TYPE_SWAP] = "Exchange one property from a player with any of yours";
PROMPTS[CARD_TYPE_STEAL] = "Steal any one property of a player";
PROMPTS[CARD_TYPE_DOUBLERENT] = "Use this with a rent card";
PROMPTS[CARD_TYPE_DEALBREAKER] = "Steal a complete set from a player";
PROMPTS[CARD_TYPE_PASSGO] = "Draw 2 cards";


const COLORS = [
	"Red",
	"Sky",
	"Black",
	"Green",
	"Orange",
	"Yellow",
	"Brown",
	"Lime",
	"Blue",
	"Purple"
];

const CARD_TEMPLATES = [
	{
		type: CARD_TYPE_MONEY,
		value: 1,
		count: 6
	},
	{
		type: CARD_TYPE_MONEY,
		value: 2,
		count: 5
	},
	{
		type: CARD_TYPE_MONEY,
		value: 3,
		count: 3
	},
	{
		type: CARD_TYPE_MONEY,
		value: 4,
		count: 3
	},
	{
		type: CARD_TYPE_MONEY,
		value: 5,
		count: 2
	},
	{
		type: CARD_TYPE_MONEY,
		value: 10,
		count: 1
	},
	{
		type: CARD_TYPE_HOUSE,
		value: 3,
		count: 3
	},
	{
		type: CARD_TYPE_HOTEL,
		value: 4,
		count: 2
	},
	{
		type: CARD_TYPE_WILD,
		value: 0,
		color: [0,1,2,3,4,5,6,7,8,9],
		count: 2,
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 3,
		color: [0],
		rent: [2,3,6],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 1,
		color: [1],
		rent: [1,2,3],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 2,
		color: [2],
		rent: [1,2,3,4],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 4,
		color: [3],
		rent: [2,4,7],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 2,
		color: [4],
		rent: [1,3,5],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 3,
		color: [5],
		rent: [2,4,6],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 1,
		color: [6],
		rent: [1,2],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 2,
		color: [7],
		rent: [1,2],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 4,
		color: [8],
		rent: [3,8],
	},
	{
		type: CARD_TYPE_PROPERTY,
		value: 2,
		color: [9],
		rent: [1,2,4],
	},
	{
		type: CARD_TYPE_WILD,
		value: 3,
		color: [0,5],
		count: 2,
	},
	{
		type: CARD_TYPE_WILD,
		value: 1,
		color: [1,6],
		count: 1,
	},
	{
		type: CARD_TYPE_WILD,
		value: 2,
		color: [2,7],
		count: 1,
	},
	{
		type: CARD_TYPE_WILD,
		value: 4,
		color: [3,8],
		count: 1,
	},
	{
		type: CARD_TYPE_WILD,
		value: 2,
		color: [4,9],
		count: 2,
	},
	{
		type: CARD_TYPE_WILD,
		value: 4,
		color: [1,2],
		count: 1,
	},
	{
		type: CARD_TYPE_WILD,
		value: 4,
		color: [2,3],
		count: 1,
	},
	{
		type: CARD_TYPE_LEASE,
		value: 1,
		color: [0,5],
		count: 2,
	},
	{
		type: CARD_TYPE_LEASE,
		value: 1,
		color: [1,6],
		count: 2,
	},
	{
		type: CARD_TYPE_LEASE,
		value: 1,
		color: [2,7],
		count: 2,
	},
	{
		type: CARD_TYPE_LEASE,
		value: 1,
		color: [3,8],
		count: 2,
	},
	{
		type: CARD_TYPE_LEASE,
		value: 1,
		color: [4,9],
		count: 2,
	},
	{
		type: CARD_TYPE_RENT,
		value: 3,
		count: 3,
	},
	{
		type: CARD_TYPE_BIRTHDAY,
		value: 2,
		count: 3,
	},
	{
		type: CARD_TYPE_DEBT,
		value: 3,
		count: 3,
	},
	{
		type: CARD_TYPE_SWAP,
		value: 3,
		count: 3,
	},
	{
		type: CARD_TYPE_STEAL,
		value: 3,
		count: 3,
	},
	{
		type: CARD_TYPE_DOUBLERENT,
		value: 1,
		count: 2,
	},
	{
		type: CARD_TYPE_DEALBREAKER,
		value: 5,
		count: 2,
	},
	{
		type: CARD_TYPE_NOCARD,
		value: 4,
		count: 3,
	},
	{
		type: CARD_TYPE_PASSGO,
		value: 1,
		count: 10,
	},

	// {
	// 	label: "Birthday Card",
	// 	value: 2,
	// 	prompt: "Collect $2 from everyone",
	// 	count: 3,
	// },
	// {
	// 	label: "Debt Collector",
	// 	value: 3,
	// 	prompt: "Collect $5 from one player",
	// 	count: 3,
	// },
	// {
	// 	label: "Swap Card",
	// 	value: 3,
	// 	prompt: "Swap any of one property of a player with yours",
	// 	count: 3,
	// },
	// {
	// 	label: "Steal Card",
	// 	value: 3,
	// 	prompt: "Steal any one property of one player",
	// 	count: 3,
	// },
	// {
	// 	label: "Deal Breaker",
	// 	value: 5,
	// 	prompt: "Steal any one complete set of a player",
	// 	count: 2,
	// },
	// {
	// 	label: "No Card",
	// 	value: 4,
	// 	count: 3,
	// },
	// {
	// 	label: "Double Rent",
	// 	value: 1,
	// 	prompt: "Use it with rent card to double your rent.",
	// 	count: 3,
	// },
	// {
	// 	label: "Pass Go",
	// 	value: 1,
	// 	prompt: "Draw 2 Cards",
	// 	count: 10,
	// },
];

function createCards(template){
	var cardtype = template.type;
	var count = cardtype == CARD_TYPE_PROPERTY ? template.rent.length : template.count;
	var cards = [];
	while(count--){
		cards.push({
			type: cardtype,
			label: getLabel(template),
			prompt: getPrompt(template),
			value: template.value,
			color: template.color,
			rent: template.rent,
		});
	}
	return cards;
}

function getLabel(template){
	if(template.type == CARD_TYPE_MONEY)
		return "$" + template.value;
	if(template.type == CARD_TYPE_LEASE)
		return COLORS[template.color[0]] + " and " + COLORS[template.color[1]] + " rent card";
	if(template.type == CARD_TYPE_WILD)
		return (template.color.length > 2 ? "All" : COLORS[template.color[0]] + " and " + COLORS[template.color[1]]) + " color wild card";
	if(template.type == CARD_TYPE_PROPERTY)
		return COLORS[template.color[0]] + " property";
	return LABELS[template.type];
}

function getPrompt(template){
	if(template.type == CARD_TYPE_LEASE)
		return "All players pay you rent on your " + COLORS[template.color[0]] + " or " + COLORS[template.color[1]] + " color property";
	return PROMPTS[template.type];
}

var cards = [];

function appendToCards(arr){
	arr.forEach(c => cards.push(c));
}

CARD_TEMPLATES.forEach(template => appendToCards(createCards(template)));
