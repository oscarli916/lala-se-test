export interface Distance {
	destination_addresses: string[];
	error_message?: string;
	origin_addresses: string[];
	rows: DistanceMatrixRow[];
	status: string;
}

interface DistanceMatrixRow {
	elements: DistanceMatrixElement[];
}

interface DistanceMatrixElement {
	status: string;
	distance?: TextValueObject;
	duration?: TextValueObject;
	duration_in_traffic?: TextValueObject;
	fare?: Fare;
}

interface TextValueObject {
	text: string;
	value: number;
}

interface Fare {
	currency: string;
	text: string;
	value: string;
}
