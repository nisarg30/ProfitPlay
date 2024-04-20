// src/utils/numberUtils.js

const formatNumber = (value) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
    return formatter.format(value);
}

export default formatNumber;
