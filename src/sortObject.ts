export function sortObject(obj: any): any {
	if (Array.isArray(obj)) {
		// Sort array elements
		return obj
			.map((item) => sortObject(item))
			.sort((a, b) => {
				if (typeof a === 'object' && typeof b === 'object') {
					return JSON.stringify(a).localeCompare(JSON.stringify(b));
				}
				return a > b ? 1 : a < b ? -1 : 0;
			});
	} else if (obj !== null && typeof obj === 'object') {
		// Sort object keys
		return Object.keys(obj)
			.sort()
			.reduce((result: any, key) => {
				result[key] = sortObject(obj[key]);
				return result;
			}, {});
	} else {
		// Return the value directly for primitive types
		return obj;
	}
}
