import type { StockDefinition } from "./schemas/definition";
import { update, type Stock } from "./schemas/stock";

const stock = (definition: StockDefinition, initialPrice: number): Stock => {
    return {
        definition,
        instance: {
            initialPrice,
            price: initialPrice,
            lowest: initialPrice,
            highest: initialPrice,
            growth: 0,
            history: {
                ticks: [],
                values: []
            }
        }
    };
};

export const stocks: Stock[] = [
    stock({
        name: "Coffee Inc.",
        abbreviation: "COFF",
        description: "Coffee Inc. is a leading producer and distributor of high-quality coffee beans and related products. Known for its robust blends and sustainable sourcing, COF caters to a global market of coffee enthusiasts, with steady growth fueled by the ongoing caffeine craze.",
        fees: 0.03,
        interest: 1,
        volatility: 0.03
    }, 45),

    stock({
        name: "Spoon Ltd.",
        abbreviation: "SPN",
        description: "Spoon Ltd. is a top manufacturer of cutlery, with a focus on spoons of all types—table spoons, teaspoons, and specialty spoons. SPN is known for its high-quality materials and elegant designs, serving both the domestic and hospitality markets",
        fees: 0.01,
        interest: 0.4,
        volatility: 0.02
    }, 12),

    stock({
        name: "Cheddar Exchange",
        abbreviation: "CHED",
        description: "The Cheddar Exchange is where the big cheese of dairy companies come to trade. From gouda to parmesan futures, investors milk every opportunity here. Got a fondness for cheese? Then this is your market.",
        fees: 0.01,
        interest: 0.8,
        volatility: 0.02
    }, 78),

    stock({
        name: "Chair Holdings",
        abbreviation: "CHA",
        description: "Chair Holdings specializes in the design, production, and sale of chairs for all purposes—office, home, and outdoor. Known for its ergonomic designs and durability, CHA is a dominant player in the furniture industry, offering comfort to millions of seated individuals.",
        fees: 0.04,
        interest: 1.2,
        volatility: 0.25
    }, 32),

    stock({
        name: "Lamp Co.",
        abbreviation: "LMP",
        description: "Lamp Co. produces a wide range of lighting solutions, from desk lamps to decorative lighting. LMP is recognized for its energy-efficient products and stylish designs, illuminating homes and offices around the world.",
        fees: 0.04,
        interest: 0.9,
        volatility: 0.28
    }, 28),

    stock({
        name: "Leftover Labs",
        abbreviation: "LOL",
        description: "Leftover Labs is a corporation that specifically deals with leftovers. They have wide range of stocks like breadcrumbs, half-eaten sandwiches, and even the occasional mushy banana. LOL is known for its unique business model and has seen steady growth in recent years.",
        fees: 0.2,
        interest: 1.0,
        volatility: 0.2
    }, 200)
    ,
    stock({
        name: "Book Inc.",
        abbreviation: "BOOK",
        description: "Book Inc. is a major publisher and distributor of printed books, catering to a diverse audience with a vast catalog of genres. Despite the rise of digital media, BOK remains a steady performer, driven by a loyal base of readers who cherish the printed word.",
        fees: 0.03,
        interest: 1.9,
        volatility: 0.22
    }, 22),

    stock({
        name: "Shoe Corp.",
        abbreviation: "SHO",
        description: "Shoe Corp. is a global leader in footwear, offering a wide range of shoes from casual sneakers to high-end dress shoes. SHO is known for combining comfort, style, and durability, making it a favorite among consumers across all demographics.",
        fees: 0.05,
        interest: 2.7,
        volatility: 0.35
    }, 64),

    stock({
        name: "Trash Stuff Inc.",
        abbreviation: "TRSH",
        description: "Trash Stuff Inc. is a leading company that claims to deal with waste management services, though recent rumors tell they are putting trash in people's trash bins? Some internal investigations show that they have a wide market somehow running on trash exchanges. They have countless lawsuist but still manage to keep their stocks up.",
        fees: 0.1,
        interest: 0.4,
        volatility: 0.4
    }, 400)
    ,
    stock({
        name: "Table Inc.",
        abbreviation: "TBL",
        description: "Table Inc. designs and manufactures tables of all shapes and sizes, from sleek modern dining tables to sturdy office desks. TBL is known for its high-quality materials and innovative designs that cater to both residential and commercial markets.",
        fees: 0.03,
        interest: 1.9,
        volatility: 0.22
    }, 39),

    stock({
        name: "Bottle Enterprises",
        abbreviation: "BOTL",
        description: "Bottle Enterprises is a leading producer of reusable water bottles and containers. BOT emphasizes sustainability and durability, catering to the eco-conscious consumer market. Their innovative designs have made them a favorite among outdoor enthusiasts.",
        fees: 0.02,
        interest: 1.8,
        volatility: 0.2
    }, 18)
];

let busy = false;

export function updateStocks() {
    if (busy) {
        console.warn("WARNING: Stock update pileup");
        return;
    }

    busy = true;

    stocks.forEach(stock => {
        update(stock.instance, stock.definition.volatility, stock.definition.interest);
    });

    busy = false;
}