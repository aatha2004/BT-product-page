import * as fs from 'fs'

const jsonPath = "sample.json";
const outputJson = "processed_output.json";

function readJson(jsonPath) {
    try {
        const data = fs.readFileSync(jsonPath, { encoding: 'utf-8' });
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading JSON file: ${e}`);
        return {};
    }
}

const jsonData = readJson(jsonPath);
const productData = jsonData.data?.getSimpleProductOffering?.product || {};
const priceData = jsonData.data?.getSimpleProductOffering?.prices || [];
const csUsProducts = jsonData.data?.getSimpleProductOffering?.productOfferingVariants || [];

const dimensions = productData.dimensions || [];
const color = dimensions.length > 0 ? dimensions[0].value : "N/A";
const capacity = dimensions.length > 1 ? dimensions[1].value : "N/A";

function calculateDiscount(price) {
    const wasPrice = price.wasPayTodayPrice || 0;
    const nowPrice = price.payTodayPrice || 0;
    const talonDiscount = price.totalDiscountAmount || 0;
    const totalSavings = (wasPrice - nowPrice) + talonDiscount > 0 ? (wasPrice - nowPrice) + talonDiscount : talonDiscount;
    return totalSavings > 0 ? totalSavings : "No discount";
}

const processedData = {
    product_details: {
        name: productData.name || "Amazon Alexa",
        manufacturer: productData.manufacturer || "Unknown",
        color: color,
        capacity: capacity,
        seo_description: productData.seoDescription || "No description available",
    },
    pricing: priceData.map(price => ({
        price_id: price.priceId || "N/A",
        pay_today_price: price.payTodayPrice || 0,
        was_pay_today_price: price.wasPayTodayPrice || 0,
        pay_monthly_price: price.payMonthlyPrice || 0,
        discount: calculateDiscount(price)
    })),
    cross_sell_upsell: csUsProducts
        .filter(csProduct => csProduct.prices && csProduct.prices.length > 0)
        .map(csProduct => ({
            variant_name: csProduct.product?.name || "Unknown",
            variant_color: csProduct.product?.dimensions?.[0]?.value || "N/A",
            pay_today_price: csProduct.prices[0].payTodayPrice || 0,
            was_pay_today_price: csProduct.prices[0].wasPayTodayPrice || 0,
            discount: calculateDiscount(csProduct.prices[0])
        }))
};

fs.writeFileSync(outputJson, JSON.stringify(processedData, null, 4), { encoding: 'utf-8' });
console.log(`Processed data saved to ${outputJson}`);