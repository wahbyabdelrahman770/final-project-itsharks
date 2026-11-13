const compactUSD = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1,
});

export function formatUSD(value) {
    if (isNaN(value)) { return ""; }
    return compactUSD.format(value);
}